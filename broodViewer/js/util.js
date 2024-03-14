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
        str += n.toString(16).padStart(2, "0")
        i = i + 1
    }
    return str.toUpperCase()
}

const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');