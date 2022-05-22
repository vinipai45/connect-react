import getRandomInt from './getRandomInt'

const maleAvatars = [
    "https://firebasestorage.googleapis.com/v0/b/connect-20112.appspot.com/o/avatar%2Fman1.webp?alt=media&token=912dbf5a-5d1c-4544-bc3f-d70ba8b9f87f",
    "https://firebasestorage.googleapis.com/v0/b/connect-20112.appspot.com/o/avatar%2Fman2.webp?alt=media&token=7c15d263-3b01-4feb-9205-148d668f2743",
    "https://firebasestorage.googleapis.com/v0/b/connect-20112.appspot.com/o/avatar%2Fman3.webp?alt=media&token=21cded3d-4673-4a57-9733-80efdaef92a6",
    "https://firebasestorage.googleapis.com/v0/b/connect-20112.appspot.com/o/avatar%2Fman4.webp?alt=media&token=7e1d0265-48e5-464d-8659-2f03631aaec5"
]

const femaleAvatars = [
    "https://firebasestorage.googleapis.com/v0/b/connect-20112.appspot.com/o/avatar%2Fwoman1.webp?alt=media&token=a77cc2a7-1484-4dfb-9d13-3a3250a95250",
    "https://firebasestorage.googleapis.com/v0/b/connect-20112.appspot.com/o/avatar%2Fwoman2.webp?alt=media&token=b6f0afcd-9330-4908-b5b4-5cad3cbad1ed",
    "https://firebasestorage.googleapis.com/v0/b/connect-20112.appspot.com/o/avatar%2Fwoman3.webp?alt=media&token=6c82892f-5a27-491a-8639-abdb3e45da10",
    "https://firebasestorage.googleapis.com/v0/b/connect-20112.appspot.com/o/avatar%2Fwoman4.webp?alt=media&token=58eaae14-114d-46ed-b459-df368b90aef7"
]

const otherAvatars = [
    "https://firebasestorage.googleapis.com/v0/b/connect-20112.appspot.com/o/avatar%2Fman1.webp?alt=media&token=912dbf5a-5d1c-4544-bc3f-d70ba8b9f87f",
    "https://firebasestorage.googleapis.com/v0/b/connect-20112.appspot.com/o/avatar%2Fman2.webp?alt=media&token=7c15d263-3b01-4feb-9205-148d668f2743",
    "https://firebasestorage.googleapis.com/v0/b/connect-20112.appspot.com/o/avatar%2Fman3.webp?alt=media&token=21cded3d-4673-4a57-9733-80efdaef92a6",
    "https://firebasestorage.googleapis.com/v0/b/connect-20112.appspot.com/o/avatar%2Fman4.webp?alt=media&token=7e1d0265-48e5-464d-8659-2f03631aaec5"
]

const getRandomAvatar = (gender) => {
    if (gender === "male") {
        return maleAvatars[getRandomInt(maleAvatars.length)]
    }
    if (gender === "female") {
        return femaleAvatars[getRandomInt(femaleAvatars.length)]
    }
    if (gender === "other") {
        return otherAvatars[getRandomInt(otherAvatars.length)]
    }
}

export { maleAvatars, femaleAvatars, otherAvatars, getRandomAvatar }