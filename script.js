const upload = document.getElementById("upload")
const preview = document.getElementById("preview")
const qualitySlider = document.getElementById("quality")
const qualityValue = document.getElementById("qualityValue")
const downloadLink = document.getElementById("downloadLink")

let imageFile

qualitySlider.oninput = () => {
qualityValue.innerText = qualitySlider.value
}

upload.onchange = (e) => {

imageFile = e.target.files[0]

const reader = new FileReader()

reader.onload = function(event){
preview.src = event.target.result
}

reader.readAsDataURL(imageFile)

}

function compressImage(){

const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")

const img = new Image()

img.src = preview.src

img.onload = function(){

canvas.width = img.width
canvas.height = img.height

ctx.drawImage(img,0,0)

canvas.toBlob(function(blob){
}, imageFile.type, qualitySlider.value)
  
const url = URL.createObjectURL(blob)

downloadLink.href = url
downloadLink.download = "compressed-image.jpg"
downloadLink.innerText = "Download Image"
downloadLink.style.display = "block"

},"image/jpeg", qualitySlider.value)

}

}
