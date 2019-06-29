import { combineReducers } from "redux";
import addFoodReducer from './foodReducer';

const rootReducer = combineReducers({
    food: addFoodReducer,
});

export default rootReducer;