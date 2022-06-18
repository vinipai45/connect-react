const generateUsername = (string) => {
    let username = string.split(" ").join("").toLowerCase().concat(Math.floor(1000 + Math.random() * 9000))
    return username
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

const getNameSearchArray = (name) => {
    let result = []

    for (let i = 1; i < name.length + 1; i++) {
        result.push(name.toString().toLowerCase().slice(0, i))
    }

    if (!(result.includes(name.toString().toLowerCase().replace(/\s/g, '')))) {
        result.push(name.toString().toLowerCase().replace(/\s/g, ''))
    }

    return result
}

export { generateUsername, getNameSearchArray, getRandomInt }