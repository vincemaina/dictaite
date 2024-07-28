'use client';

import React, { useState } from 'react';
import axios from 'axios';

const AudioUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [transcription, setTranscription] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('/api/transcribe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setTranscription(response.data.transcription);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <label>
        Select an audio file:
        <input type="file" onChange={handleFileChange} />
      </label>
      <button onClick={handleFileUpload}>Upload and Transcribe</button>
      {transcription && (
        <div>
          <h2>Transcription:</h2>
          <p>{transcription}</p>
        </div>
      )}
    </div>
  );
};

export default AudioUploader;
