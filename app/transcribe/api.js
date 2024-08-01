/**
 * Call the Hugging Face API to transcribe the audio file.
 * 
 * @param {Buffer} data 
 * @returns {Promise<{text: string}>}
 */
async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/facebook/wav2vec2-base-960h",
		{
			headers: {
				Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
				"Content-Type": "application/json",
			},
			method: "POST",
			body: data,
		}
	);
	const result = await response.json();
	return result;
}

module.exports = query;

// const data = fs.readFileSync("app/transcribe/sample.mp3");
// query(data).then((response) => {
// 	console.log(JSON.stringify(response));
// });