import { EDIT_HABIT } from "../actions/types";
import { users as usersReducer } from './users';
import { habits as habitsReducer } from './habits';
import { habits_completed as habitsCompletedReducer } from './habits';
import { categories as categoriesReducer } from './categories';

const initialState = {
    // habits: {
    //     items: [
    //         {
    //             id: 1,
    //             title: 'No more sweets',
    //             startDate: '07/09/2017',
    //             endDate: '21/11/2017'
    //         },
    //         {
    //             id: 2,
    //             title: 'Wake up at 06:00',
    //             startDate: '01/10/2017',
    //             endDate: '30/11/2017'
    //         },
    //         {
    //             id: 3,
    //             title: 'Run 2 miles every day',
    //             startDate: '03/11/2017',
    //             endDate: '21/11/2017'
    //         }
    //     ]
    // },
    user: {},
    habits: {
        items: []
    },
    habits_completed: {
        items: []
    },
    categories: [],
};

export const reducer = (state = initialState, action) => {
    return {
        user: usersReducer(state.user, action),
        habits: habitsReducer(state.habits, action),
        habits_completed: habitsCompletedReducer(state.habits_completed, action),
        categories: categoriesReducer(state.categories, action)
    }
};
