import { firebase } from "../../services/firebase"
import { USERS } from '../Database/collections'

class AuthDB {

    async saveUserToDB(docId, data) {
        console.log(docId, "docId")
        console.log(data, "data")
        return new Promise(async (resolve, reject) => {
            firebase
                .firestore()
                .collection(USERS)
                .doc(docId)
                .set(data)
                .then(() => {

                    return resolve(true)
                })
                .catch(err => {
                    return reject(err)
                })

        })

    }


}

export default AuthDB