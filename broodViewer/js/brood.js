var keyData = new URLSearchParams(window.location.search)
import partConfig from "https://trithedragon.github.io/dragonmaker/config.js" 

document.addEventListener('DOMContentLoaded', function() {

    dragonBounceInit()

}, false);

window.addEventListener('unload', function () {
    document.documentElement.innerHTML = '';
});

function dragonBounceInit(){

    for (const wrapper of document.getElementsByClassName("dragonWrapper")){

        let dragon = wrapper.getElementsByClassName('dragon')[0]

        
        wrapper.style.left = `${Math.random() * (window.innerWidth - dragon.width)}px`
        wrapper.style.top = '600px'
        let name = genKeys(getPartCount(partConfig), partConfig.parts.length)
        loadCanvas(name, dragon.id, partConfig)

        $(`#${dragon.id}`).width(100)
        $(`#${dragon.id}`).height(100)
        wrapper.getElementsByTagName('p')[0].innerText = name[0] + name.slice(1).toLowerCase()

        newBounce($(`#${wrapper.id}`))
    }
}