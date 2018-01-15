import * as types from '../actions/types';

export const habits = (state = {}, action) => {
    switch (action.type) {
        case types.REFRESH_HABITS:
            console.log("Action: ", action.items);
            return {
                ...state,
                items: action.items
            };
        case types.FETCH_HABITS_STARTED:
            return {
                ...state,
                fetching: action.fetching,
                uid: action.uid
            };
        case types.FETCH_HABITS_SUCCESS:
            return {
                ...state,
                fetching: action.fetching,
                items: action.items
            };
        case types.FETCH_HABITS_FAIL:
            return {
                ...state,
                fetching: action.fetching,
            };
        // case types.EDIT_HABIT:
        //     return {
        //         ...state,
        //         items: updatedHabits(state.items, action)
        //     };

        case types.EDIT_HABIT_STARTED:
            return {
                ...state,
                fetching: action.fetching,
            };
        case types.EDIT_HABIT_SUCCESS:
            return {
                ...state,
                fetching: action.fetching,
                items: updatedHabits(state.items, action.item)
            };
        case types.EDIT_HABIT_FAIL:
            return {
                ...state,
                fetching: action.fetching,
            };
        default:
            return state;
    }
};

export const habits_completed = (state = {}, action) => {
    switch(action.type) {
        case types.REFRESH_COMPLETED_HABITS:
            console.log("Action: ", action.items);
            return {
                ...state,
                items: action.items
            };
        default:
            return state;
    }
};

function updatedHabits(state = [], action) {
    return state.map((habit) => {
        if (habit.id === action.id) {
            return Object.assign({}, habit, {
                title: action.title,
                startDate: action.startDate,
                endDate: action.endDate
            })
        }
        return habit;
    });
}