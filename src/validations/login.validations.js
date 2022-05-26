const isEmpty = (string) => {
    return (!string || string.length === 0);
}

const validateLoginInputs = async (inputs) => {
    let isValid = true
    let error = {
        message: ""
    }

    if (isEmpty(inputs.email) || isEmpty(inputs.password)) {
        isValid = false

        error.message = "invalid credentials"
    }

    return { error, isValid }
}

export { validateLoginInputs }