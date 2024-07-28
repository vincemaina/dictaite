from flask import Flask, request, jsonify
app = Flask(__name__)

@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"



import torch
from transformers import Wav2Vec2ForCTC, Wav2Vec2Processor, AutoModelForTokenClassification, AutoTokenizer
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

def restore_punctuation(text):
    tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
    model = AutoModelForTokenClassification.from_pretrained("bert-base-uncased")

    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    with torch.no_grad():
        outputs = model(**inputs).logits
    
    predictions = torch.argmax(outputs, dim=-1)
    tokens = tokenizer.convert_ids_to_tokens(inputs["input_ids"][0])
    predicted_labels = [model.config.id2label[pred.item()] for pred in predictions[0]]
    
    punctuated_text = ""
    for token, label in zip(tokens, predicted_labels):
        if token.startswith("##"):
            punctuated_text += token[2:]
        else:
            punctuated_text += " " + token
        if label != "O":
            punctuated_text += label.replace(" ", "")
    
    return punctuated_text

@app.route("/api/transcribe", methods=["POST"])
def transcribe():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    audio_array = load_audio(file)
    if audio_array is None:
        return jsonify({"error": "Error processing audio file"}), 500

    transcription = transcribe_audio(audio_array)
    if transcription is None:
        return jsonify({"error": "Error transcribing audio file"}), 500

    punctuated_transcription = restore_punctuation(transcription)
    return jsonify({"transcription": punctuated_transcription})