from flask import Flask, request, jsonify
app = Flask(__name__)

@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"



import torch
from transformers import Wav2Vec2ForCTC, Wav2Vec2Processor
from pydub import AudioSegment
import numpy as np

def load_audio(file):
    try:
        audio = AudioSegment.from_file(file)
        audio = audio.set_frame_rate(16000).set_channels(1)
        audio_array = np.array(audio.get_array_of_samples(), dtype=np.float32)  # Ensure the dtype is float32
        return audio_array
    except Exception as e:
        print(f"Error loading audio file: {e}")
        return None

def transcribe_audio(audio_array):
    try:
        processor = Wav2Vec2Processor.from_pretrained("facebook/wav2vec2-base-960h")
        model = Wav2Vec2ForCTC.from_pretrained("facebook/wav2vec2-base-960h")
        
        # Convert numpy array to torch tensor with the correct data type
        inputs = processor(audio_array, sampling_rate=16000, return_tensors="pt", padding=True)
        inputs["input_values"] = inputs["input_values"].type(torch.FloatTensor)
        
        with torch.no_grad():
            logits = model(**inputs).logits
        
        predicted_ids = torch.argmax(logits, dim=-1)
        transcription = processor.batch_decode(predicted_ids)
        return transcription[0]
    except Exception as e:
        print(f"Error transcribing audio: {e}")
        return None


@app.route("/api/transcribe", methods=["POST"])
def transcribe():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    audio_array = load_audio(file)
    transcription = transcribe_audio(audio_array)
    return jsonify({"transcription": transcription})
