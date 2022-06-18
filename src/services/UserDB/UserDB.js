import { firebase } from "../firebase"
import { USERS } from "../Database/collections";
class UserDB {
    async searchUsers(searchText) {
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
            console.log(' User -> searchUsers', err)
            return err
        }

    }
}

export default UserDB