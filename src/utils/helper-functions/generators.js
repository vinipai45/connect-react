const generateUsername = (string) => {
    let username = string.split(" ").join("").toLowerCase().concat('#' + Math.floor(1000 + Math.random() * 9000))
    return username
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

export { generateUsername, getRandomInt }