export const drawWaveform = (audioBuffer, canvas) => {
    const canvasCtx = canvas.getContext('2d');
    const { width, height } = canvas;
    const data = audioBuffer.getChannelData(0); // Get the first channel data
    const step = Math.ceil(data.length / width);
    const amp = height / 2;

    canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    canvasCtx.fillRect(0, 0, width, height);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
    canvasCtx.beginPath();

    for (let i = 0; i < width; i++) {
        const min = Math.min(...data.slice(i * step, (i + 1) * step));
        const max = Math.max(...data.slice(i * step, (i + 1) * step));
        canvasCtx.moveTo(i, (1 + min) * amp);
        canvasCtx.lineTo(i, (1 + max) * amp);
    }

    canvasCtx.stroke();
};
