export async function POST(req: Request) {
    try {
        const body = await req.json();
        const text = body.text;

        const res = await fetch(
            "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    inputs: text,
                    parameters: {
                        max_length: 100
                    }
                }),
            }
        )

        const summary = await res.json();


        return new Response(JSON.stringify(summary), {
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