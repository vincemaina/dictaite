import transcribe from "../../../util/transcription/openai-whisper";
import os from 'os';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export const config = {
    api: {
      bodyParser: false,
    },
};

export async function POST(req: Request) {    
    try {
        const formData = await req.formData();
        const file = await formData.get('audio') as File
        
        if (!file) {
            return new Response('No file uploaded', {
                status: 400,
            });
        } else {
            console.log("Received file:", file);
        }

        const tempdir = os.tmpdir();
        const tempFilePath  = path.join(tempdir, file.name);

        const arrayBuffer = await file.arrayBuffer();
        fs.writeFileSync(tempFilePath, Buffer.from(arrayBuffer));

        const response = await transcribe(tempFilePath);

        console.log("Transcription complete:", response);

        return new Response(JSON.stringify(response), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    
    } catch (error) {
        console.error("Something went wrong in /api/transcribe route:", error);
        return new Response('Error uploading file: ' + error, {
            status: 500,
        });
    }
}