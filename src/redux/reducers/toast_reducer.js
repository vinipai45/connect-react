import Swal from 'sweetalert2';
import * as type from '../consts';

const init = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

export function toastRed(state = init, action) {
    switch (action.type) {
        case type.toast:
            return action.payLoad;
        default:
            return state;
    }
}
