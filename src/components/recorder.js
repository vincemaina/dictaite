'use client';

// components/Recorder.js
import React, { useState, useRef, useEffect } from 'react';

const Recorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrls, setAudioUrls] = useState([]);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    useEffect(() => {
        const storedAudioUrls = JSON.parse(localStorage.getItem('audioUrls')) || [];
        setAudioUrls(storedAudioUrls);
    }, []);

    const handleStartRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = event => {
            audioChunksRef.current.push(event.data);
        };
        mediaRecorderRef.current.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
            const url = URL.createObjectURL(audioBlob);
            const newAudioUrls = [...audioUrls, url];
            setAudioUrls(newAudioUrls);
            localStorage.setItem('audioUrls', JSON.stringify(newAudioUrls));
            audioChunksRef.current = [];
        };
        mediaRecorderRef.current.start();
        setIsRecording(true);
    };

    const handleStopRecording = () => {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
    };

    const handleDelete = (index) => {
        const newAudioUrls = audioUrls.filter((_, i) => i !== index);
        setAudioUrls(newAudioUrls);
        localStorage.setItem('audioUrls', JSON.stringify(newAudioUrls));
    };

    return (
        <div>
            <button onClick={isRecording ? handleStopRecording : handleStartRecording}>
                {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
            <ul>
                {audioUrls.map((url, index) => (
                    <li key={index}>
                        <audio src={url} controls />
                        <button onClick={() => handleDelete(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Recorder;
