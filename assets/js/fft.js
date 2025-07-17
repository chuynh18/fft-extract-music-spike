const fileInput = document.getElementById("audioInput");

fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];

    let fileArrayBuffer; // holds contents of file as an array buffer
    
    readFile(file).then(
        result => {
            fileArrayBuffer = result;
            console.log(fileArrayBuffer);
        }
    );
});

async function readFile(file) {
    const fileArrayBuffer = await file.arrayBuffer().then(buffer => buffer);
    return fileArrayBuffer;
}

const audioContext = new AudioContext();
