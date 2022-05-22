import { auth_user } from "../utils/constants"


const isUserLoggedIn = async () => {
    try {
        let authUser = JSON.parse(localStorage.getItem(auth_user))

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