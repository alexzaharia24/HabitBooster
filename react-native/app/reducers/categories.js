import * as types from '../actions/types';

export const categories = (state = {}, action) => {
    switch (action.type) {
        case types.REFRESH_CATEGORIES:
            console.log("Action: ", action.items);
            return action.items;
        default:
            return state;
    }
};
