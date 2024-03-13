const xVel = 25
const yBase = 800
const jumpHeight = 25
const yMaxVel = 10

function bounce(dragonWrapper, i, dir, yVel){


    dragon = dragonWrapper.children('canvas')
    dragonWrapper.css('z-index', Math.floor(dragonWrapper.position().top))

    if (i >= 0){
        dragonWrapper.animate({top:[`-=${yVel}px`, 'linear'], left: [`+=${(dir * xVel)}px`, 'linear']}, 150);
        dragon.animate({rotate: ['-7deg', 'linear']}, 25)
        dragon.animate({top: [`-=${jumpHeight}px`, 'easeOutSine']}, 50)
        dragon.animate({rotate: ['7deg', 'linear']}, 25)
        dragon.animate({top: [`+=${jumpHeight}px`, 'easeInSine']},{
            duration: 50,
            complete: (function(){
                bounce(dragonWrapper, i - 1, dir, yVel)
            })
        })
        
        //setTimeout(function(){bounce(dragonWrapper, i - 1, dir, yVel)}, 170)
    }else{
        dragon.animate({rotate: ['0deg', 'linear']}, 25)
        let t = Math.random() * 10000
        setTimeout(function(){newBounce(dragonWrapper)}, t)
    }
}

function newBounce(dragonWrapper){

    let dragon = dragonWrapper.children('canvas')

    let room = window.innerWidth - dragon.width()
    let xTarget = Math.random() * room
    let nBounce = Math.floor((xTarget - dragonWrapper.position().left)  / xVel)

    let height = window.innerHeight - dragonWrapper.height() * 1.25
    let yTop = height - dragon.height()
    let yTarget = height - (Math.random() * (height - yTop)) 
    let yVel = Math.max(Math.min((dragonWrapper.position().top - yTarget) / Math.abs(nBounce), yMaxVel), -1 * yMaxVel)

    if (Math.sign(nBounce) == 1){
        dragon.addClass("flipped")
    }else{
        dragon.removeClass("flipped")
    }

    setTimeout(function(){bounce(dragonWrapper, Math.abs(nBounce), Math.sign(nBounce), yVel)}, Math.random() * 5000) 
}