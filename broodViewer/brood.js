var keyData = new URLSearchParams(window.location.search)
import partConfig from "https://trithedragon.github.io/dragonmaker/config.js" 

document.addEventListener('DOMContentLoaded', function() {
    var path = window.location.pathname;
    var page = path.split("/").pop();
    if (page == "single")
        dragonGenInit()
    else
        dragonBounceInit()

}, false);

window.addEventListener('unload', function () {
    document.documentElement.innerHTML = '';
});

function dragonGenInit(){
    if (keyData.has('key')) {
        keyData = keyData.get('key').toUpperCase()
    }else{
        keyData = genKeys(getPartCount(), partConfig.parts.length)
    }

    loadCanvas(keyData, "dragonCanvas", partConfig)
    document.getElementsByClassName("dragonWrapper")[0].getElementsByTagName('p')[0].innerText = keyData[0] + keyData.slice(1).toLowerCase()
}

function dragonBounceInit(){

    for (const wrapper of document.getElementsByClassName("dragonWrapper")){

        let dragon = wrapper.getElementsByClassName('dragon')[0]

        
        wrapper.style.left = `${Math.random() * (window.innerWidth - dragon.width)}px`
        wrapper.style.top = '600px'
        let name = genKeys(getPartCount(), partConfig.parts.length)
        loadCanvas(name, dragon.id, partConfig)

        $(`#${dragon.id}`).width(100)
        $(`#${dragon.id}`).height(100)
        wrapper.getElementsByTagName('p')[0].innerText = name[0] + name.slice(1).toLowerCase()

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
        console.log(n)
        if (n < 26){
            str += String.fromCharCode(n + 65)
        }else{
            str += String.fromCharCode(n + 23)
        }
        i = i + 1
    }
    console.log(str)
    return str
}
["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"]