var keyData = new URLSearchParams(window.location.search)
//import partConfig from "https://trithedragon.github.io/dragonmaker/config.js" 

document.addEventListener('DOMContentLoaded', function() {

    let elem = document.querySelector("#hiddenWrapper")
    let container = document.querySelector(".main-container")

    /*for(let i = 0; i < 5; i++){
        let c = elem.cloneNode(true)
        c.classList.remove("base")
        c.id = `dWrapper${i}`
        container.appendChild(c)
    }*/

    dragonBounceInit()

}, false);

window.addEventListener('unload', function () {
    document.documentElement.innerHTML = '';
});

document.addEventListener('keyup', function(k){

    if (k.key != "d") return

    let elem = document.querySelector("#hiddenWrapper")
    let container = document.querySelector(".main-container")
    let c = elem.cloneNode(true)
    c.classList.remove("base")

    let name = genKeys(getPartCount(partConfig), partConfig.parts.length)
    c.id = name

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

    loadCanvas(name, newArrays, dragon, partConfig)
    $(dragon).width(100)
    $(dragon).height(100)
    c.getElementsByTagName('p')[0].innerText = name[0] + name.slice(1).toLowerCase()

    newBounce($(c))

})

function dragonBounceInit(){

    for (const wrapper of document.getElementsByClassName("dragonWrapper")){

        if (wrapper.classList.contains("base")) continue

        let dragon = wrapper.getElementsByClassName('dragon')[0]

        wrapper.style.left = `${(window.innerWidth / 2)}px`
        wrapper.style.top = '800px'

        let name, newArrays
        if (wrapper.id = "bubblegum"){
            name = partConfig.defaultParts
            newArrays = partConfig.colours
            console.log(newArrays)
            wrapper.getElementsByTagName('p')[0].innerText = "Bubblegum"
        }else{
            name = genKeys(getPartCount(partConfig), partConfig.parts.length)
            newArrays = {
                "PRIMARY" : [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)], 
                "SECONDARY" : [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)],
                "DETAILS" : [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)], 
                "EYECOL" : [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)]
            }
            wrapper.getElementsByTagName('p')[0].innerText = name[0] + name.slice(1).toLowerCase()
        }
        loadCanvas(name, newArrays, dragon, partConfig)

        $(dragon).width(100)
        $(dragon).height(100)
        

        newBounce($(`#${wrapper.id}`))
    }
}
