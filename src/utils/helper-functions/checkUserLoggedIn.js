import { auth_token } from "../constants"


const isUserLoggedIn = () => {
    try {
        let authUser = localStorage.getItem(auth_token)

        if (!authUser) {
            return false
        }

        return true

    } catch (error) {
        console.error(error, "error")
    }
}

export {
    isUserLoggedIn
}