var keyData = new URLSearchParams(window.location.search)
//import partConfig from "https://trithedragon.github.io/dragonmaker/config.js" 

const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');


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

        c.value = "#" + genRanHex(6)
        console.log(c.value)
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

    let b = document.createElement("button")
    b.textContent = "RANDOM"
    b.onclick = function(){genNew()}
    form.appendChild(b)

    dragonGenInit()


}, false);

function dragonGenInit(){
    let cols = {}

    Object.keys(partConfig.colours).forEach((col) => {
        let c = document.getElementById(col).value.match(/[A-Za-z0-9]{2}/g)
        cols[col] = c.map(function(v) { return parseInt(v, 16) })
    })

    loadCanvas(keyData, cols, "dragonCanvas", partConfig)
    let t = document.getElementsByClassName("dragonWrapper")[0].getElementsByTagName('a')[0]
    t.href = `${window.location.href.split('?')[0]}?key=${keyData}`
    t.innerText = keyData[0] + keyData.slice(1).toLowerCase()
}

function genNew(){

    let sel = document.getElementsByTagName("select")
    Array.from(sel).forEach((s) => {
        s.value = s.children[(Math.floor(Math.random() * s.children.length))].value
    })

    let col = document.getElementsByTagName("input")
    Array.from(col).forEach((c) => {
        c.value = "#" + genRanHex(6)
    })

    genFromDropdown()
        
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

    loadCanvas(key, cols, "dragonCanvas", partConfig)
    let t = document.getElementsByClassName("dragonWrapper")[0].getElementsByTagName('a')[0]
    t.href = `${window.location.href.split('?')[0]}?key=${key}`
    t.innerText = key[0] + key.slice(1).toLowerCase()

}