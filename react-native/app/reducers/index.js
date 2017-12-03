import { EDIT_HABIT } from "../actions/types";
import { users as usersReducer } from './users';
import { habits as habitsReducer } from './habits';

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
    habits: {
        items: []
    },
    user: {}
};

export const reducer = (state = initialState, action) => {
    return {
        habits: habitsReducer(state.habits, action),
        user: usersReducer(state.user, action)
    }
};
