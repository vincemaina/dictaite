'use client';

// components/Recorder.js
import React, { useState, useRef, useEffect } from 'react';
import { saveAudioBlob, getAllAudioBlobs, deleteAudioBlob } from '../util/indexedDB';

const Recorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrls, setAudioUrls] = useState([]);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const canvasRef = useRef(null);
    const mediaStreamRef = useRef(null);

    useEffect(() => {
        const fetchAudioBlobs = async () => {
            const blobs = await getAllAudioBlobs();
            const urls = blobs.map(({ id, blob }) => ({
                id,
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
                setAudioUrls(prevUrls => [...prevUrls, { id, url }]);
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
            setIsRecording(false);
        } else {
            console.error('MediaRecorder is not initialized.');
        }
        if (audioContextRef.current) {
            audioContextRef.current.close();
        }
        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach(track => track.stop());
        }
    };

    const handleDelete = async (id) => {
        await deleteAudioBlob(id);
        setAudioUrls(audioUrls.filter(audio => audio.id !== id));
    };

    return (
        <div>
            <button onClick={isRecording ? handleStopRecording : handleStartRecording}>
                {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
            <canvas ref={canvasRef} width="600" height="100" />
            <ul>
                {audioUrls.map(({ id, url }) => (
                    <li key={id}>
                        <audio src={url} controls />
                        <button onClick={() => handleDelete(id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Recorder;
