const audioContext = new OfflineAudioContext();
const analyser = audioContext.createAnalyser();
analyser.fftSize = 2048; // defaults to 2048, but putting it here in case I want to change it


const fileInput = document.getElementById("audioInput");

fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];

    let fileArrayBuffer; // holds contents of file as an array buffer
    
    readFile(file).then(
        result => {
            fileArrayBuffer = result;
            console.log(fileArrayBuffer);

            const source = audioContext.createBufferSource();
            source.buffer = fileArrayBuffer;
        }
    );
});

async function readFile(file) {
    const fileArrayBuffer = await file.arrayBuffer().then(buffer => buffer);
    return fileArrayBuffer;
}

/*
Not sure how to do most of these things but fundamentally what I need to do is the following:
1. load arbitrary digital audio file
2. load file into web audio api (offline audio context?)
3. Downmix to mono
4. Split the file into smaller segments for FFT analysis
5. Do FFT analysis on each chunk to extract frequency data
6. Reject overtones
7. collate when each frequency begins and ends then convert those into notes
8. convert that data into the object format that my digital piano uses to play music
*/