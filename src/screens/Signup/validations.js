const validateEmail = (email) => {
    let isValid = String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    return isValid
}

const validateSignupInputs = (inputs) => {

    let isError = false

    let errors = {
        name: "",
        email: "",
        username: "",
        password: "",
        confirm_password: ""
    }

    if (inputs.name.length < 3 || !(/^[a-zA-Z]+$/.test(inputs.name)) || inputs.name.length > 20) {
        errors.name = "invalid name"
        isError = true
    }

    if (inputs.username.length < 5) {
        errors.username = "invalid username"
        isError = true
    }

    if (!inputs.email || !(validateEmail(inputs.email))) {
        errors.email = "invalid email"
        isError = true
    }

    if (!isError) {
        return null
    }

    return errors

}

export { validateSignupInputs }