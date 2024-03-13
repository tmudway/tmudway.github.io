function loadCanvas(keyData, id, partsConfig){

    let canvas, ctx, imgs
    let imagesLoaded = 0

    let imgList = getImages(keyData)
    canvas = document.getElementById(id)
    ctx = canvas.getContext("2d")
    imgs = imgList.map(img => loadImage(img, drawCanvas))
    

    function getImages(key){
        imgs = []
        partsConfig.parts.forEach(function (part, i){
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
        swapColours()
    }

    function loadImage(src, onload) {
        const img = new Image();
        img.crossOrigin = "Anonymous"
        img.onload = onload;
        img.src = src;
        return img;
    }

    function swapColours(){
        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        let replaceArrays = [[255, 114, 150], [255, 177, 197], [255, 187, 64], [255, 67, 53]]
        let newArrays = [[Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)], 
                         [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)],
                         [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)], 
                         [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)]]

        replaceArrays.forEach(function (rArr, j){
            
            for (var i=0;i<imgData.data.length;i+=4){
                // is this pixel the old rgb?
                if(imgData.data[i]==rArr[0] &&
                    imgData.data[i+1]==rArr[1] &&
                    imgData.data[i+2]==rArr[2]
                ){                    
                    // change to your new rgb
                    imgData.data[i]=newArrays[j][0];
                    imgData.data[i+1]=newArrays[j][1];
                    imgData.data[i+2]=newArrays[j][2];
                }
            }
        })

        ctx.putImageData(imgData, 0, 0)
        
    }
}

