const fs = require('fs');
const OpenAI = require('openai');

require('dotenv').config({
    path: ['./.env', './.env.local']
})

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Transcribes an audio file using the OpenAI Whisper API
 * 
 * @param {string} path - The audio file to be transcribed
 * @returns {Object} - The transcription of the audio file 
 */
async function main(path) {
    const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(path),
        model: "whisper-1",
        response_format: "verbose_json",
        timestamp_granularities: ["segment"]
        // TODO: look into adding language param https://platform.openai.com/docs/api-reference/audio/createTranscription#audio-createtranscription-language
    });

    console.log(transcription);

    return transcription;
}

module.exports = main;
