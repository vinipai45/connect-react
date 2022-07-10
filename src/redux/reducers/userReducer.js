import * as type from '../consts';

const init = {
    initial: {

        id: "",
        name: "",
        email: "",
        avatar: "",
        username: "",
        bio: "",
        gender: "",
        role: "",
        followers: 0,
        following: 0,
    }
}

export function userRed(state = init, action) {
    switch (action.type) {
        case type.user:
            return action.payLoad;
        default:
            return state;
    }
}