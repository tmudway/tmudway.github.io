
const parts = ["tail", "wing", "body", "ears", "eyes", "horns", "neck", "mouth"]
var keyData = new URLSearchParams(window.location.search)

document.addEventListener('DOMContentLoaded', function() {

    if (keyData.has('key')) {
        keyData = keyData.get('key')
    }else{
        keyData = genKeys(0, 1, 8)
    }

    console.log(keyData)

    parts.forEach(function (key, i){
        let elem = document.getElementById(key)
        elem.src = `https://tmudway.github.io/broodViewer/images/${key}/${keyData.charAt(i)}.png`
    })
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