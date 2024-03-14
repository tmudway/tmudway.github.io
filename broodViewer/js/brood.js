var keyData = new URLSearchParams(window.location.search)
//import partConfig from "https://trithedragon.github.io/dragonmaker/config.js" 

document.addEventListener('DOMContentLoaded', function() {

    initBubblegum()

    /*for(let i = 0; i < 5; i++){
        let key = genKeys(getPartCount(partConfig), partConfig.parts.length)
        genNewDragon(key, key)
    }*/

}, false);

window.addEventListener('onEventReceived', function (obj) {

    const listener = obj.detail.listener.split("-")[0]
    const event = obj.detail.event
    console.log(event)

    if (listener === 'follower'){
        let key = genKeys(getPartCount(partConfig), partConfig.parts.length)
        genNewDragon(key, event.name)
    }
})

window.addEventListener('keyup', function(k){
    if (k.key != "d") return
    let key = genKeys(getPartCount(partConfig), partConfig.parts.length)
    genNewDragon(key, key)
})

function initBubblegum(){
    let wrapper = window.getElementById("bubblegum")
    let dragon = wrapper.getElementsByClassName('dragon')[0]

    wrapper.style.left = `${(window.innerWidth / 2)}px`
    wrapper.style.top = '800px'

    let name = partConfig.defaultParts
    let newArrays = partConfig.colours
    wrapper.getElementsByTagName('p')[0].innerText = "Bubblegum"
    loadCanvas(name, newArrays, dragon, partConfig)

    $(dragon).width(100)
    $(dragon).height(100)
        
    newBounce($(wrapper))
}

function genNewDragon(key, name){
    let elem = document.querySelector("#hiddenWrapper")
    let container = document.querySelector(".main-container")
    let c = elem.cloneNode(true)
    c.classList.remove("base")

    c.id = key

    let dragon = c.getElementsByClassName('dragon')[0]
    c.style.left = `${Math.random() * (window.innerWidth - 100)}px`
    c.style.top = '800px'

    container.appendChild(c)

    let newArrays = {
        "PRIMARY" : [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)], 
        "SECONDARY" : [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)],
        "DETAILS" : [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)], 
        "EYECOL" : [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)]
    }

    loadCanvas(key, newArrays, dragon, partConfig)
    $(dragon).width(100)
    $(dragon).height(100)

    c.getElementsByTagName('p')[0].innerText = name[0] + name.slice(1).toLowerCase()

    newBounce($(c))
}