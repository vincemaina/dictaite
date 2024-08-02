import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Transcribes an audio file using the OpenAI Whisper API
 */
export default async function transcribe(filePath: string) {

    if (!filePath.trim()) {
        throw new Error("No file path provided");
    }

    const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(filePath),
        model: "whisper-1",
        response_format: "verbose_json",
        timestamp_granularities: ["segment"]
        // TODO: look into adding language param https://platform.openai.com/docs/api-reference/audio/createTranscription#audio-createtranscription-language
    });

    console.log(transcription);

    return transcription;
}
