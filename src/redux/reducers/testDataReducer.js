import * as type from '../consts';

const init = {
    initial: {
        id: '',
        name: '',
        email: '',
    },
};

export function testDataRed(state = init, action) {
    switch (action.type) {
        case type.test_data:
            return action.payLoad;
        default:
            return state;
    }
}
