import { firebase } from "../../services/firebase"
import { USERS } from '../Database/collections'

class AuthDB {

    async saveUserToDB(docId, data) {
        return new Promise(async (resolve, reject) => {
            try {
                await firebase
                    .firestore()
                    .collection(USERS)
                    .doc(docId)
                    .set(data)

                return resolve(true)

            } catch (err) {
                return reject(err)
            }
        })

    }


}

export default AuthDB