const fileInput = document.getElementById("audioInput");

fileInput.addEventListener("change", () => {
    console.log(fileInput.files[0]);
});