import { USERS } from "../services/Database/collections";
import { firebase } from "../services/firebase";

const isEmpty = (string) => {
    return (!string || string.length === 0);
}

const validateUsername = (username) => {

    if (isEmpty(username) || username.length < 4) {
        return { valid: false, code: 1 }
    }

    firebase
        .firestore()
        .collection(USERS)
        .where("username", "==", username)
        .get()
        .then((res) => {
            return { valid: false, code: 2 }
        })

    return { valid: true, code: 0 }
}

const validateUpdateProfileInputs = (inputs) => {
    let isValid = true
    let error = {
        name: "",
        username: "",
    }

    let isValidUsername = validateUsername(inputs.username)

    if (isValidUsername.code === 2) {
        isValid = false
        error.username = "username already exists"
    }
    if (isValidUsername.code === 1) {
        isValid = false
        error.username = "invalid username"
    }

    if (isEmpty(inputs.name) || inputs.name.length < 3) {
        isValid = false
        error.name = "invalid name"
    }

    return { error, isValid }
}

export { validateUpdateProfileInputs }