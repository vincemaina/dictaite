'use client';

// components/Recorder.js
import React, { useState, useRef, useEffect } from 'react';
import { saveAudioBlob, getAllAudioBlobs, deleteAudioBlob } from '../util/indexedDB';

const Recorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrls, setAudioUrls] = useState([]);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

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

    const handleStartRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
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
    };

    const handleStopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        } else {
            console.error('MediaRecorder is not initialized.');
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
