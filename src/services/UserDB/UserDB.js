import { firebase } from "../firebase"
import { USERS } from "../Database/collections";
import userEvent from "@testing-library/user-event";
import { getNameSearchArray } from "../../utils/helper-functions/generators";
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

    async update(id, user) {
        try {
            if (!firebase) {
                return false
            }

            let namesearch = getNameSearchArray(user.name.trim())

            let { name, username, bio, avatar } = user

            await firebase
                .firestore()
                .collection(USERS)
                .doc(id)
                .update({
                    namesearch,
                    name,
                    username,
                    bio,
                    avatar
                })

            return await this.getById(id)

        } catch (err) {
            console.log(' User -> update', err)
            return false
        }
    }
}

export default UserDB