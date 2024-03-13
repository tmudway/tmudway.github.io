function getPartCount(partConfig){
    let partCount = []
    partConfig.parts.forEach(part => {
        partCount.push(partConfig.count[part])
    })
    return partCount
}

function genKeys(size = [1], length = 1){
    let str = ""
    let i = 0
    while (i < length){
        let n = Math.floor((Math.random() * size[i]))
        if (n < 26){
            str += String.fromCharCode(n + 65)
        }else{
            str += String.fromCharCode(n + 23)
        }
        i = i + 1
    }
    return str
}