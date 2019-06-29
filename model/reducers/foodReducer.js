import {ADD_FOOD, UPDATE_FOOD} from "../actions/actions";

const initialState = [{name: 'banana', approxPrice: 1.5, market: 'Dia', done: false}, {name: 'leche', approxPrice: 1, market: 'Dia', done: true}];
// const initialState = [];

export default (state = initialState, action) => {

    switch (action.type) {
        case ADD_FOOD:
            return [...state, action.food];
        case UPDATE_FOOD:
            return state.map(item => {
                return item.name === action.food.name ? {...item, done: !item.done} : item;
            });
        default:
            return state;

    }
};