const upload = document.getElementById("upload");
const preview = document.getElementById("preview");
const qualitySlider = document.getElementById("quality");
const qualityValue = document.getElementById("qualityValue");
const downloadLink = document.getElementById("downloadLink");

let imageFile = null;

qualitySlider.addEventListener("input", function() {
    qualityValue.textContent = qualitySlider.value;
});

upload.addEventListener("change", function(e) {
    imageFile = e.target.files[0];

    if (!imageFile) return;

    const reader = new FileReader();

    reader.onload = function(event) {
        preview.src = event.target.result;
    };

    reader.readAsDataURL(imageFile);
});

function compressImage() {

    if (!imageFile) {
        alert("Please upload an image first.");
        return;
    }

    const img = new Image();
    img.src = preview.src;

    img.onload = function () {

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        canvas.toBlob(function(blob) {

            const url = URL.createObjectURL(blob);

            downloadLink.href = url;
            downloadLink.download = "compressed-" + imageFile.name;
            downloadLink.innerText = "Download Image";
            downloadLink.style.display = "block";

        }, "image/jpeg", qualitySlider.value);

    };
}
