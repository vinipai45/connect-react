const firebaseExceptionHandler = (code) => {
    switch (code) {
        case "auth/wrong-password":
            return "Invalid Credentials!"
        case "auth/user-not-found":
            return "Please check the email!"
        case "auth/email-already-in-use":
            return "user already exists!"
        default:
            return "something went wrong"
    }
}

export { firebaseExceptionHandler }