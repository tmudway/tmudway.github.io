var keyData = new URLSearchParams(window.location.search)
//import partConfig from "https://trithedragon.github.io/dragonmaker/config.js" 

document.addEventListener('DOMContentLoaded', function() {

    if (keyData.has('key')) {
        keyData = keyData.get('key').toUpperCase()
    }else{
        keyData = genKeys(getPartCount(partConfig), partConfig.parts.length)
    }

    let form = document.getElementsByClassName("form")[0]
    let pCount = partConfig.count

    Object.keys(partConfig.colours).forEach((col) => {
        let l = document.createElement("label")
        l.setAttribute("for", col)
        l.innerHTML = col

        let c = document.createElement("input")
        c.type = "color"
        c.id = col
        c.onchange = function(){genFromDropdown()}

        form.append(l)
        form.append(c)
    })

    partConfig.parts.forEach((part, pi) => {
        let l = document.createElement("label")
        l.setAttribute("for", part)
        l.innerHTML = part

        let s = document.createElement("select")
        s.id = part
        for (let i = 0; i < pCount[part]; i++){
            let cha
            if (i < 26){
                cha = String.fromCharCode(i + 65)
            }else{
                cha = String.fromCharCode(i + 23)
            }
            s.options.add(new Option(cha, cha))
        }
        s.value = keyData[pi]
        s.onchange = function(){genFromDropdown()}
        
        form.appendChild(l)
        form.appendChild(s)

        document.getElementById(part).value = keyData[pi]
    });

    dragonGenInit()


}, false);

function dragonGenInit(){

    let newArrays = {
        "PRIMARY" : [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)], 
        "SECONDARY" : [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)],
        "DETAILS" : [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)], 
        "EYES" : [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)]
    }

    loadCanvas(keyData, newArrays, "dragonCanvas", partConfig)
    let t = document.getElementsByClassName("dragonWrapper")[0].getElementsByTagName('a')[0]
    t.href = `${window.location.href.split('?')[0]}?key=${keyData}`
    t.innerText = keyData[0] + keyData.slice(1).toLowerCase()
}

function genFromDropdown(){
    let key = ""
    partConfig.parts.forEach((part, pi) => {
        let form = document.getElementById(part)
        key += form.value
    })

    let cols = {}

    Object.keys(partConfig.colours).forEach((col) => {
        let c = document.getElementById(col).value.match(/[A-Za-z0-9]{2}/g)
        cols[col] = c.map(function(v) { return parseInt(v, 16) })
    })

    console.log(cols)

    loadCanvas(key, cols, "dragonCanvas", partConfig)
    let t = document.getElementsByClassName("dragonWrapper")[0].getElementsByTagName('a')[0]
    t.href = `${window.location.href.split('?')[0]}?key=${key}`
    t.innerText = key[0] + key.slice(1).toLowerCase()

}