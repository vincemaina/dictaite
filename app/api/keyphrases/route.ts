export async function POST(req: Request) {
    try {
        const body = await req.json();
        const text = body.text;

        const response = await fetch(
            "https://api-inference.huggingface.co/models/ml6team/keyphrase-extraction-kbir-inspec",
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    inputs: text,
                }),
            }
        );
        let result = await response.json();

        result = result.sort((a: any, b: any) => b.score - a.score);

        result.forEach((element: any) => {
            element.word = element.word.trim();
        });

        result = result.filter((element: any) => element.word.length > 0 && element.score > 0.9);

        console.log(result);

        return new Response(JSON.stringify(result), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        return new Response(error.message, { status: 500 });
    }
}