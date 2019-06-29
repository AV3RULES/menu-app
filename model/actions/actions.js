export const ADD_FOOD = 'ADD_FOOD';
export const UPDATE_FOOD = 'UPDATE_FOOD';

const initialState  = [];

export function addFoodAction(name, approxPrice, market, done) {
    return {
        type: ADD_FOOD,
        food: {
            name,
            approxPrice,
            market,
            done,
        },
    }
}

export function updateFoodAction(name) {
    return {
        type: UPDATE_FOOD,
        food: {
            name,
        },
    }
}