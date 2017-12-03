import {EDIT_GOAL} from "../actions/index";
import {users as usersReducer} from './users';

const initialState = {
    habits: [
        {
            id: 1,
            title: 'No more sweets',
            startDate: '07/09/2017',
            endDate: '21/11/2017'
        },
        {
            id: 2,
            title: 'Wake up at 06:00',
            startDate: '01/10/2017',
            endDate: '30/11/2017'
        },
        {
            id: 3,
            title: 'Run 2 miles every day',
            startDate: '03/11/2017',
            endDate: '21/11/2017'
        },
    ],
    user: {}
};

function habits(state = [], action) {
    switch(action.type) {
        case EDIT_GOAL:
            return  updatedHabits(state, action);
            break;
        default:
            return state;
    }
}

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

export const reducer = (state = initialState, action) => {
    return {
        habits: habits(state.habits, action),
        user: usersReducer(state.user, action)
    }
};
