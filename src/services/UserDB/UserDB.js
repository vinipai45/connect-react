import { firebase } from "../firebase"
import { USERS, PENDING, FOLLOWERS, FOLLOWING } from "../Database/collections";
import { getNameSearchArray } from "../../utils/helper-functions/generators";
import { FOLLOW_STATUS } from "../../utils/constants";
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

    async getMultipleUsers(ids) {
        try {
            if (!firebase) {
                return false
            }

            const snapshot = await firebase
                .firestore()
                .collection(USERS)
                .where("id", "in", ids)
                .get()

            return snapshot.docs.map(doc => doc.data());


        } catch (err) {
            console.log('UserDB -> getMultipleUsers', err)
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

    async sendFollowRequest(senderId, recieverId) {
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
            console.log('UserDB -> sendFollowRequest', err)
        }
    }

    async acceptFollowRequest(senderId, recieverId) {
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
                        users: firebase.firestore.FieldValue.arrayRemove(senderId)
                    },
                    { merge: true }
                )

            await firebase
                .firestore()
                .collection(FOLLOWERS)
                .doc(recieverId)
                .set(
                    {
                        users: firebase.firestore.FieldValue.arrayUnion(senderId)
                    },
                    { merge: true }
                )
            await firebase
                .firestore()
                .collection(FOLLOWING)
                .doc(senderId)
                .set(
                    {
                        users: firebase.firestore.FieldValue.arrayUnion(recieverId)
                    },
                    { merge: true }
                )

        } catch (err) {
            console.log('UserDB -> acceptFollowRequest', err)
        }
    }

    async listPendingRequests(id) {
        try {
            return new Promise((resolve, reject) => {

                if (!firebase) {
                    return resolve(false)
                }

                firebase
                    .firestore()
                    .collection(PENDING)
                    .doc(id)
                    .onSnapshot((snapshot) => {
                        return resolve(snapshot.data().users)
                    })
            })

        } catch (err) {
            console.log('UserDB -> listPendingRequests', err)
        }
    }

    async isFollowing(followerId, followingId) {
        try {
            if (!firebase) {
                return false
            }

            const pendingSnapshot = await firebase
                .firestore()
                .collection(PENDING)
                .doc(followingId)
                .get()

            if (pendingSnapshot.data()) {
                let { users } = pendingSnapshot.data()
                if (users.includes(followerId)) {
                    return FOLLOW_STATUS.REQUESTED
                }
            }


            const snapshot = await firebase
                .firestore()
                .collection(FOLLOWERS)
                .doc(followingId)
                .get()

            if (snapshot.data()) {
                let { users } = snapshot.data()
                if (users.includes(followerId)) {
                    return FOLLOW_STATUS.FOLLOWING
                }
            }


            return FOLLOW_STATUS.FOLLOW


        } catch (err) {
            console.log('UserDB -> isFollowing', err)
        }
    }

    async cancelFollowRequest(senderId, recieverId) {
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
                        users: firebase.firestore.FieldValue.arrayRemove(senderId)
                    },
                    { merge: true }
                )


        } catch (err) {
            console.log('UserDB -> cancelFollowRequest', err)
        }
    }

    async unfollow(followerId, followingId) {
        try {
            if (!firebase) {
                return false
            }

        } catch (err) {
            console.log('UserDB -> unfollow', err)
        }
    }


}

export default UserDB