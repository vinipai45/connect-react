import { firebase } from "../../services/firebase"
import AuthDB from "../Database/auth.db";
import { auth_token, auth_user } from "../../utils/constants";


class Authentication {
    constructor() {
        this.authDB = new AuthDB()
    }

    async signinWithGoogle(inputs) {

        return new Promise(async (resolve, reject) => {
            try {
                if (!firebase) {
                    return false
                }

                let provider = new firebase.auth.GoogleAuthProvider();

                let googleLoggedInUser = await firebase.auth().signInWithPopup(provider)

                if (!googleLoggedInUser) {
                    return false
                }

                var credential = googleLoggedInUser?.credential;

                var token = credential?.accessToken;

                let isNewUser = googleLoggedInUser?.additionalUserInfo?.isNewUser

                let uid = googleLoggedInUser?.user?.uid

                let data = {
                    bio: "",
                    avatar: "",
                    email: googleLoggedInUser.user.email,
                    name: googleLoggedInUser.user.displayName,
                    username: inputs.username,
                    role: "user",
                    gender: ""
                }

                if (isNewUser) {

                    let savedUser = await this.authDB.saveUserToDB(uid, data)

                    if (!savedUser) {
                        return reject(false)
                    }

                }


                localStorage.setItem(auth_token, token)

                localStorage.setItem(auth_user, JSON.stringify(googleLoggedInUser.user))


                return resolve(true)

            } catch (err) {
                reject(err)
            }
        })


    }

    async siginWithEmailAndPassword(inputs) {
        return new Promise(async (resolve, reject) => {
            try {

                if (!firebase) {
                    return false
                }

                let user = await firebase.auth().signInWithEmailAndPassword(inputs.email, inputs.password)

                if (!user) {
                    return reject(false)
                }

                return resolve(user)

            } catch (err) {
                return reject(err)
            }
        })
    }

    async createUserWithEmailAndPassword(inputs) {
        return new Promise(async (resolve, reject) => {
            try {

                if (!firebase) {
                    return false
                }

                let user = await firebase.auth().createUserWithEmailAndPassword(inputs.email, inputs.password)

                if (user) {
                    user = user.user.multiFactor.user
                }

                let data = {
                    bio: "",
                    avatar: inputs.avatar,
                    email: inputs.email,
                    name: inputs.name,
                    username: inputs.username,
                    role: "user",
                    gender: inputs.gender
                }

                let savedUser = await this.authDB.saveUserToDB(user.uid, data)

                if (!savedUser) {
                    return resolve(false)
                }

                localStorage.setItem(auth_token, user.accessToken)

                localStorage.setItem(auth_user, JSON.stringify(user))

                return resolve(true)

            } catch (err) {
                return reject(err)
            }
        })
    }

    async sendPasswordResetEmail(email) {
        return new Promise(async (resolve, reject) => {
            try {
                await firebase.auth().sendPasswordResetEmail(email)
                return resolve(true)
            } catch (err) {
                return reject(err)
            }
        })
    }
}

export default Authentication