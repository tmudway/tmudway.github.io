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

    if (listener === 'follower'){
        let key = genKeys(getPartCount(partConfig), partConfig.parts.length)
        genNewDragon(key, event.name)
    }
})

window.addEventListener('keyup', function(k){
    if (k.key != "d") return
    let key = genKeys(getPartCount(partConfig), partConfig.parts.length)
    genNewDragon(key, dragonNames[Math.floor(Math.random() * 201)])
})

function initBubblegum(){
    let wrapper = document.getElementById("bubblegum")
    let dragon = wrapper.getElementsByClassName('dragon')[0]

    wrapper.style.left = `${(window.innerWidth / 2)}px`
    wrapper.style.top = '800px'

    let name = partConfig.defaultParts
    let newArrays = partConfig.colours
    wrapper.getElementsByTagName('p')[0].innerText = "Bubblegum"
    loadCanvas(name, newArrays, dragon, partConfig)

    $(dragon).width(100)
    $(dragon).height(100)

    addDragonDragging(wrapper)
    
    setTimeout(function(){newBounce($(wrapper))}, Math.random() * 5000)
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

    let newArrays = {}
    Object.keys(partConfig.colours).forEach(function(k){
        newArrays[k] = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)]
    })

    loadCanvas(key, newArrays, dragon, partConfig)
    $(dragon).width(100)
    $(dragon).height(100)

    c.getElementsByTagName('p')[0].innerText = name[0] + name.slice(1).toLowerCase()

    addDragonDragging(c)

    setTimeout(function(){newBounce($(c))}, Math.random() * 5000)
}

function addDragonDragging(wrapper){

    let dragon = wrapper.getElementsByClassName('dragon')[0]

    wrapper.addEventListener("mousedown", function(event){

        dragon.classList.add("drag")
        wrapper.style.zIndex = 1000000

        function moveAt(pX, pY){
            wrapper.style.left = pX - wrapper.offsetWidth / 2 + 'px';
            wrapper.style.top = pY - wrapper.offsetHeight / 2 + 'px';
        }

        moveAt(event.pageX, event.pageY)

        function onMouseMove(event){
            moveAt(event.pageX, event.pageY)
        }

        document.addEventListener("mousemove", onMouseMove);

        function wiggle(){
            if (dragon.classList.contains('animateUp')){
                dragon.classList.remove('animateUp')
                dragon.classList.add('animateDown')
            }else{
                dragon.classList.remove('animateDown')
                dragon.classList.add('animateUp')
            }
        }

        function flip(){
            if (dragon.classList.contains('flipped')){
                dragon.classList.remove('flipped')
            }else{
                dragon.classList.add('flipped')
            }
        }

        let wInterval = setInterval(wiggle, 70)
        let fInterval = setInterval(flip, 1000 + Math.floor(Math.random() * 1000))

        wrapper.onmouseup = function(){
            document.removeEventListener("mousemove", onMouseMove);
            wrapper.onmouseup = null
            clearInterval(wInterval)
            clearInterval(fInterval)
            dragon.classList.remove("drag")
            dragon.classList.remove('animateUp')
            dragon.classList.remove('animateDown')
            wrapper.style.zIndex = wrapper.style.top
        }
    })
}