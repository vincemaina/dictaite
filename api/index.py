from flask import Flask, request, jsonify
app = Flask(__name__)

@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"



import torch
from transformers import Wav2Vec2ForCTC, Wav2Vec2Processor
from pydub import AudioSegment
import numpy as np

def load_audio(file_path):
    # Load audio file
    audio = AudioSegment.from_file(file_path)
    
    # Ensure the audio is in the required format (16kHz, mono)
    audio = audio.set_frame_rate(16000).set_channels(1)
    
    # Convert to numpy array
    audio_array = np.array(audio.get_array_of_samples())
    
    return audio_array

def transcribe_audio(audio_array):
    # Load the pretrained model and processor
    processor = Wav2Vec2Processor.from_pretrained("facebook/wav2vec2-base-960h")
    model = Wav2Vec2ForCTC.from_pretrained("facebook/wav2vec2-base-960h")

    # Process the audio
    inputs = processor(audio_array, sampling_rate=16000, return_tensors="pt", padding=True)
    
    # Run inference
    with torch.no_grad():
        logits = model(**inputs).logits

    # Decode the predicted transcription
    predicted_ids = torch.argmax(logits, dim=-1)
    transcription = processor.batch_decode(predicted_ids)
    return transcription[0]


@app.route("/transcribe", methods=["POST"])
def transcribe():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    audio_array = load_audio(file)
    transcription = transcribe_audio(audio_array)
    return jsonify({"transcription": transcription})
