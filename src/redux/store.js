import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { testDataRed } from "./reducers/testDataReducer";
import { toastRed } from "./reducers/toast_reducer";

export default createStore(
    combineReducers({
        test_data: testDataRed,
        toast: toastRed,
    }),
    composeWithDevTools(applyMiddleware(thunk))
);