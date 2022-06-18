import * as type from '../consts';

const init = {
    initial: {

        name: "",
        email: "",
        avatar: "",
        username: "",
        bio: "",
        gender: "",
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