import { firebase } from "../../services/firebase"
import AuthDB from "../Database/auth.db";
import { auth_token, auth_user } from "../../utils/constants";
import { generateUsername, getNameSearchArray } from "../../utils/helper-functions/generators";


class Authentication {
    constructor() {
        this.authDB = new AuthDB()
    }

    async signinWithGoogle() {

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

                let user = googleLoggedInUser.user.multiFactor.user

                let uid = googleLoggedInUser.user.multiFactor.user.uid

                let namesearch = getNameSearchArray(user.displayName.trim())

                let data = {
                    bio: "",
                    avatar: user.photoURL,
                    email: user.email,
                    name: user.displayName.toString().toLowerCase().trim(),
                    username: generateUsername(user.displayName).trim(),
                    namesearch,
                    role: "user",
                    gender: ""
                }

                if (isNewUser) {
                    await this.authDB.saveUserToDB(uid, data)

                }


                localStorage.setItem(auth_token, token)

                localStorage.setItem(auth_user, JSON.stringify(googleLoggedInUser.user.multiFactor.user))


                return resolve(googleLoggedInUser.user.multiFactor.user)

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

                user = user.user.multiFactor.user

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

                // sendEmailVerification(auth.currentUser);

                if (user) {
                    user = user.user.multiFactor.user
                }

                let namesearch = getNameSearchArray(inputs.name.trim())

                let data = {
                    bio: "",
                    avatar: inputs.avatar,
                    email: inputs.email.trim(),
                    name: inputs.name.toLowerCase().trim(),
                    username: inputs.username.trim(),
                    namesearch,
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