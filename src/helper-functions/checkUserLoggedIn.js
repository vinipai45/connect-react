import { firebase } from "../services/firebase"


const isUserLoggedIn = async () => {
    try {
        let authUser = JSON.parse(sessionStorage.getItem('Shambu User'))

        // firebase.auth()
        //     .createCustomToken(authUser.uid)
        //     .then((customToken) => {
        //         // Send token back to client
        //         console.log(customToken, "customToken")
        //     })

        // let user = await firebase.auth().signInWithCustomToken(authToken)

        // console.log(user, "auth user")

        // if (!user) {
        //     return false
        // }

        // return true
    } catch (error) {
        console.error(error, "error")
    }
}

export {
    isUserLoggedIn
}