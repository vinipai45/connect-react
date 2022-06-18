import { firebase } from "../../services/firebase"
import { USERS } from '../Database/collections'

class AuthDB {

    saveUserToDB(docId, data) {
        firebase
            .firestore()
            .collection(USERS)
            .doc(docId)
            .set(data)
            .then(() => {
                return true
            })
            .catch(err => {
                console.log(' AuthDB -> saveUserToDB', err)
                return err
            })

    }


}

export default AuthDB