const firebaseExceptionHandler = (code) => {
    switch (code) {
        case "auth/wrong-password":
            return "invalid credentials !"
        case "auth/user-not-found":
            return "please check the email !"
        case "auth/email-already-in-use":
            return "user already exists !"
        case "auth/invalid-email":
            return "invalid email"
        default:
            return code
    }
}

export { firebaseExceptionHandler }