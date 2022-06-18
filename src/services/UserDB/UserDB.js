import { firebase } from "../firebase"
import { USERS } from "../Database/collections";
class UserDB {
    async search(searchText) {
        try {
            if (!firebase) {
                return false
            }

            const snapshot = await firebase
                .firestore()
                .collection(USERS)
                .where("namesearch", "array-contains", searchText)
                .get()

            return snapshot.docs.map(doc => doc.data());

        } catch (err) {
            console.log(' User -> search', err)
            return err
        }

    }

    async getById(id) {
        try {
            if (!firebase) {
                return false
            }

            const snapshot = await firebase
                .firestore()
                .collection(USERS)
                .doc(id)
                .get()

            let result = snapshot.data()
            delete result['namesearch']

            return result

        } catch (err) {
            console.log(' User -> getById', err)
            return false
        }

    }
}

export default UserDB