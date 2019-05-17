const items = ["▁", "▂", "▃", "▄", "▅", "▆", "▇", "█"];
const fps = 20;

var frequencyData;
var context;
var analyzer;

function main() {
    frequencyData = new Uint8Array(16);
    context = new AudioContext();
    analyzer = context.createAnalyser();
    analyzer.fftSize = 32;

    navigator.mediaDevices.getUserMedia({audio: true}).then(stream => {
        context.createMediaStreamSource(stream).connect(analyzer);

        updateVisualizer();
    });
}

function updateVisualizer() {
    setTimeout(updateVisualizer, 1000 / fps);
    analyzer.getByteFrequencyData(frequencyData);

    let visualizerData = [];
    frequencyData.forEach((data) => {
        let selectedItem = items[Math.floor((data / 255) * 8)];
        visualizerData.push(selectedItem);
    });

    window.history.replaceState({}, "", visualizerData.join(""));
    document.title = visualizerData.join("");
}