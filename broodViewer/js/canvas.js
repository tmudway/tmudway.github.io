function loadCanvas(keyData, id, parts){

    let canvas, ctx, imgs
    let imagesLoaded = 0

    let imgList = getImages(keyData)
    canvas = document.getElementById(id)
    ctx = canvas.getContext("2d")
    imgs = imgList.map(img => loadImage(img, drawCanvas))

    function getImages(key){
        imgs = []
        parts.forEach(function (part, i){
            imgs.push(`https://trithedragon.github.io/dragonmaker/${part}/${key.charAt(i)}.png`)
        })

        imgs.splice(6, 0, "https://trithedragon.github.io/dragonmaker/JAW.png")
        return imgs
    }

    function drawCanvas() {
        imagesLoaded += 1;
        if (imagesLoaded === imgs.length) {
            imgs.map(image => {
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            })
        }
    }

    function loadImage(src, onload) {
        const img = new Image();
        img.onload = onload;
        img.src = src;
        return img;
    }
}

