import {
    Navigate,
} from "react-router-dom";
import { auth_token } from "../constants";

const PrivateRoute = ({ children }) => {
    const auth = localStorage.getItem(auth_token) || null

    return auth ? children : <Navigate to="/login" />;
}

export default PrivateRoute