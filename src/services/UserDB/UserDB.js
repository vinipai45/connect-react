import { firebase } from "../firebase"
import { USERS, PENDING } from "../Database/collections";
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

            return { ...result, id }

        } catch (err) {
            console.log(' User -> getById', err)
            return false
        }

    }

    async getByUsername(username) {
        try {
            if (!firebase) {
                return false
            }

            const snapshot = await firebase
                .firestore()
                .collection(USERS)
                .where("username", "==", username)
                .get()

            let result = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });

            if (result) {
                delete result['namesearch']
            }

            return result

        } catch (err) {
            console.log(' User -> getByUsername', err)
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

    async followUser(senderId, recieverId) {
        try {
            if (!firebase) {
                return false
            }

            await firebase
                .firestore()
                .collection(PENDING)
                .doc(recieverId)
                .set(
                    {
                        users: firebase.firestore.FieldValue.arrayUnion(senderId)
                    },
                    { merge: true }
                )

        } catch (err) {
            console.log('UserDB -> followUser', err)
        }
    }


}

export default UserDB