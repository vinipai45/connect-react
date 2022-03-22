import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { testDataRed } from "./reducers/testDataReducer";

export default createStore(
    combineReducers({
        test_data: testDataRed,
    }),
    composeWithDevTools(applyMiddleware(thunk))
);