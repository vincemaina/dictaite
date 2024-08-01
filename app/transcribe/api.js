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

/**
 * Call API.
 * 
 * @param {Blob} blob 
 */
async function callApi(blob) {
    // Convert Blob to ArrayBuffer.
    const arrayBuffer = await blob.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    const response = await query(uint8Array);
    console.log(response);
    return response;
}

module.exports = callApi;
