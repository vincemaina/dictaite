const fs = require('fs');
const OpenAI = require('openai');

require('dotenv').config({
    path: ['./.env', './.env.local']
})

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
    const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream("./util/transcription/sample.mp3"),
        model: "whisper-1",
        response_format: "verbose_json",
        timestamp_granularities: ["segment"]
        // TODO: look into adding language param https://platform.openai.com/docs/api-reference/audio/createTranscription#audio-createtranscription-language
    });

    console.log(transcription);
}

main()

module.exports = main;
