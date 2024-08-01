import query from "./api";

export const dynamic = 'force-dynamic' // defaults to auto

export async function POST(req: Request) {    
    try {
        const formData = await req.formData();
        const file = formData.get('file');

        if (!file) {
            return new Response('No file uploaded', {
                status: 400,
            });
        }

        const blob = new Blob([file], { type: 'audio/wav' });

        const response = await query(blob);

        return new Response(JSON.stringify(response), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    
    } catch (error) {
        return new Response('Error uploading file: ' + error, {
            status: 500,
        });
    }
}