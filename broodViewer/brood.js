var keyData = new URLSearchParams(window.location.search)
import partConfig from "https://trithedragon.github.io/dragonmaker/config.js" 

document.addEventListener('DOMContentLoaded', function() {

    //dragonGenInit()
    dragonBounceInit()

}, false);

function dragonGenInit(){
    if (keyData.has('key')) {
        keyData = keyData.get('key')
    }else{
        keyData = genKeys(getPartCount(), partConfig.parts.length)
    }

    loadCanvas(keyData, "dragonCanvas", partConfig)
}

function dragonBounceInit(){

    for (const wrapper of document.getElementsByClassName("dragonWrapper")){

        let dragon = $(`#${wrapper.id}`).children('canvas')

        
        dragon.css('left', `${Math.random() * (window.innerWidth - dragon.width())}px`)
        loadCanvas(genKeys(getPartCount(), partConfig.parts.length), dragon.attr('id'), partConfig)
        dragon.width(300)
        dragon.height(300)

        newBounce($(`#${wrapper.id}`))
    }
}

function getPartCount(){
    let partCount = []
    partConfig.parts.forEach(part => {
        partCount.push(partConfig.count[part])
    })
    return partCount
}

function genKeys(size = [1], length = 1){
    console.log(size)
    let str = ""
    let i = 0
    while (i < length){
        let n = Math.floor((Math.random() * size[i]))
        if (n <= 26){
            str += String.fromCharCode(n + 65)
        }else{
            str += String.fromCharCode(n + 21)
        }
        i = i + 1
    }
    console.log(str)
    return str
}