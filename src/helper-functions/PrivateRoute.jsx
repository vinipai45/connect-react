import {
    Navigate,
} from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const auth = sessionStorage.getItem('Shambu Auth Token') || null

    return auth ? children : <Navigate to="/login" />;
}

export default PrivateRoute