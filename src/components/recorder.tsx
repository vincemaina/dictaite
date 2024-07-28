'use client';

import React, { useState, useRef, useEffect } from 'react';
import { saveAudioBlob, getAllAudioBlobs, deleteAudioBlob } from '../util/indexedDB';
import Waveform from './waveform';

const Recorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrls, setAudioUrls] = useState<{
        id: any;
        blob: any;
        url: string;
    }[]>([]);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);

    useEffect(() => {
        const fetchAudioBlobs = async () => {
            const blobs = await getAllAudioBlobs();
            const urls = blobs.map(({ id, blob }) => ({
                id,
                blob,
                url: URL.createObjectURL(blob),
            }));
            setAudioUrls(urls);
        };
        fetchAudioBlobs();
    }, []);

    const drawVisualizer = () => {
        if (!analyserRef.current || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext('2d');

        if (!canvasCtx) return;

        const analyser = analyserRef.current;
        const bufferLength = analyser.fftSize;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            requestAnimationFrame(draw);

            analyser.getByteTimeDomainData(dataArray);

            canvasCtx.fillStyle = 'rgb(200, 200, 200)';
            canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

            canvasCtx.lineWidth = 2;
            canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

            canvasCtx.beginPath();

            const sliceWidth = (canvas.width * 1.0) / bufferLength;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
                const y = (v * canvas.height) / 2;

                if (i === 0) {
                    canvasCtx.moveTo(x, y);
                } else {
                    canvasCtx.lineTo(x, y);
                }

                x += sliceWidth;
            }

            canvasCtx.lineTo(canvas.width, canvas.height / 2);
            canvasCtx.stroke();
        };

        draw();
    };

    const handleStartRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;
        // @ts-ignore
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();

        const source = audioContextRef.current.createMediaStreamSource(stream);
        source.connect(analyserRef.current);

        analyserRef.current.fftSize = 2048;

        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = event => {
            if (event.data && event.data.size > 0) {
                audioChunksRef.current.push(event.data);
            } else {
                console.error('Audio data is empty.');
            }
        };

        mediaRecorderRef.current.onstop = async () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
            if (audioBlob.size > 0) {
                const id = await saveAudioBlob(audioBlob);
                const url = URL.createObjectURL(audioBlob);
                setAudioUrls(prevUrls => [...prevUrls, { id, url, blob: audioBlob }]);
            } else {
                console.error('Audio blob size is 0.');
            }
            audioChunksRef.current = [];
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
        drawVisualizer();
    };

    const handleStopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        } else {
            console.error('MediaRecorder is not initialized.');
        }

        if (audioContextRef.current) {
            audioContextRef.current.close();
        }

        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach(track => track.stop());
        }

        setIsRecording(false);
    };

    const handleDelete = async (id: number) => {
        await deleteAudioBlob(id);
        setAudioUrls(audioUrls.filter(audio => audio.id !== id));
    };

    return (
        <div>
            <button onClick={isRecording ? handleStopRecording : handleStartRecording} className='bg-red-500 text-white px-3 py-1 rounded-xl'>
                {isRecording ? 'Stop' : 'Record'}
            </button>
            <canvas ref={canvasRef} width="600" height="100" />
            <ul>
                {audioUrls.map(({ id, url, blob }) => (
                    <li key={id}>
                        <button onClick={() => handleDelete(id)}>Delete</button>
                        <Waveform blob={blob} url={url}/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Recorder;
