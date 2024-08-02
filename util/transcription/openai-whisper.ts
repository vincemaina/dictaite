import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

interface OpenAITranscriptionSegment {
    "id": number,
    "seek": number,
    "start": number,
    "end": number,
    "text": string,
    "tokens": number[],
    "temperature": number,
    "avg_logprob": number,
    "compression_ratio": number,
    "no_speech_prob": number
}

export interface OpenAITranscriptionObject {
    "task": string,
    "language": string,
    "duration": number,
    "text": string,
    "segments": OpenAITranscriptionSegment[]
}
  
/**
 * Transcribes an audio file using the OpenAI Whisper API
 */
export default async function transcribe(filePath: string): Promise<OpenAITranscriptionObject> {

    if (!filePath.trim()) {
        throw new Error("No file path provided");
    }

    const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(filePath),
        model: "whisper-1",
        response_format: "verbose_json",
        timestamp_granularities: ["segment"]
        // TODO: look into adding language param https://platform.openai.com/docs/api-reference/audio/createTranscription#audio-createtranscription-language
    }) as OpenAITranscriptionObject;

    console.log(transcription);

    return transcription;
}
