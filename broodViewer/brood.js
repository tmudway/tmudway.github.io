const parts = ["tail", "wing", "body", "ears", "eyes", "horns", "neck", "mouth"]
var keyData = new URLSearchParams(window.location.search)

let canvas, ctx, imgs
let imagesLoaded = 0

document.addEventListener('DOMContentLoaded', function() {

    if (keyData.has('key')) {
        keyData = keyData.get('key')
    }else{
        keyData = genKeys(0, 1, 8)
    }

    let imgList = getImages(keyData)
    canvas = document.getElementById("dragonCanvas")
    ctx = canvas.getContext("2d")
    imgs = imgList.map(img => loadImage(img, drawCanvas))

}, false);

function genKeys(start = 0, end = 1, length = 1){
    let str = ""
    let i = 0
    while (i < length){
        console.log(str)
        let n = Math.round((Math.random() * (end - start)) + start)
        console.log(n)
        str += String.fromCharCode(n + 97)
        i = i + 1
    }
    return str
}

function getImages(key){
    imgs = ["https://tmudway.github.io/broodViewer/images/base.png"]
    parts.forEach(function (part, i){
        imgs.push(`https://tmudway.github.io/broodViewer/images/${part}/${key.charAt(i)}.png`)
    })

    return imgs
}

function drawCanvas() {
    imagesLoaded += 1;
    if (imagesLoaded === imgs.length) {
        imgs.map(image => {
            ctx.drawImage(image, 0, 0, 314, 296);
        })
    }
}

function loadImage(src, onload) {
    const img = new Image();
    img.onload = onload;
    img.src = src;
    return img;
}