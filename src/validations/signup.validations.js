import { USERS } from "../services/Database/collections";
import { firebase } from "../services/firebase";

const isEmpty = (string) => {
    return (!string || string.length === 0);
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const validatePassword = (password) => {
    return String(password)
        .match(
            /^(?=(?:[^a-z]*[a-z]){2})(?=(?:[^0-9]*[0-9]){2})(?=.*[!-\/:-@\[-`{-~]).{8,}$/i
        );
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

const validateSignupInputs = (inputs) => {
    let isValid = true
    let error = {
        name: "",
        email: "",
        username: "",
        password: "",
        gender: ""
    }

    if (!validateEmail(inputs.email)) {
        isValid = false
        error.email = "invalid email"
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

    if (!validatePassword(inputs.password)) {
        isValid = false
        error.password = "invalid password"
    }

    if (inputs.password !== inputs.confirm_password) {
        isValid = false
        error.confirm_password = "password mismatch"
    }

    if (isEmpty(inputs.gender)) {
        isValid = false
        error.gender = "gender cannot be empty"
    }

    return { error, isValid }
}

export { validateSignupInputs }