'use client';

import { useEffect, useRef, useState } from "react";

const handleDrawWaveform = async (blob: Blob, canvas: HTMLCanvasElement) => {
    // @ts-ignore
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const arrayBuffer = await blob.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    drawWaveform(audioBuffer, canvas);
};

const drawWaveform = (audioBuffer: AudioBuffer, canvas: HTMLCanvasElement) => {
    const canvasCtx = canvas.getContext('2d');

    if (!canvasCtx) return;

    const { width, height } = canvas;
    const data = audioBuffer.getChannelData(0); // Get the first channel data
    const step = Math.ceil(data.length / width);
    const amp = height / 2;

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = '#11003B';
    canvasCtx.beginPath();

    for (let i = 0; i < width; i++) {
        // @ts-ignore
        const min = Math.min(...data.slice(i * step, (i + 1) * step));
        // @ts-ignore
        const max = Math.max(...data.slice(i * step, (i + 1) * step));
        canvasCtx.moveTo(i, (1 + min) * amp);
        canvasCtx.lineTo(i, (1 + max) * amp);
    }

    canvasCtx.stroke();
};

const drawPlaybackPosition = (audio: any, canvas: HTMLCanvasElement | null) => {

    if (!canvas) return;

    const canvasCtx = canvas.getContext('2d');

    if (!canvasCtx) return;

    const { width, height } = canvas;

    const updatePosition = () => {
        if (audio.paused || audio.ended) return;

        requestAnimationFrame(updatePosition);

        const currentTime = audio.currentTime;
        const duration = audio.duration;
        const x = (currentTime / duration) * width;

        // Clear the previous frame
        canvasCtx.clearRect(0, 0, width, height);

        // Redraw the waveform
        handleDrawWaveform(audio.blob, canvas);

        // Draw the vertical line
        canvasCtx.strokeStyle = 'red';
        canvasCtx.lineWidth = 2;
        canvasCtx.beginPath();
        canvasCtx.moveTo(x, 0);
        canvasCtx.lineTo(x, height);
        canvasCtx.stroke();
    };

    updatePosition();
};

interface WaveformProps {
    url: string;
    blob: Blob;
}

export default function Waveform(props: WaveformProps) {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.onplay = () => setIsPlaying(true);
            audioRef.current.onpause = () => setIsPlaying(false);
        }
    }, []);

    useEffect(() => {
        if (canvasRef.current) {
            handleDrawWaveform(props.blob, canvasRef.current);
        }
    }, [props.blob]);

    function handleTogglePlay() {
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
    }

    return (
        <div title="Voice note waveform"
            onClick={handleTogglePlay}
        >
            <canvas ref={canvasRef} width="600" height="50" className="m-auto mb-5"/>
            <audio
                className="hidden"
                src={props.url}
                controls
                ref={audioRef}
                // onPlay={e => drawPlaybackPosition(e.target, canvasRef.current)}
            />
        </div>
    );
}