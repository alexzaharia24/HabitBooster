import {EDIT_GOAL} from "../actions/index";

const initialState = {
    goals: [
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
    ]
};

function goals(state = [], action) {
    switch(action.type) {
        case EDIT_GOAL:
            return  updatedGoals(state.goals, action);
            break;
        default:
            return state.goals;
    }
}

function updatedGoals(state = [], action) {
    return state.map((goal) => {
        if (goal.id === action.id) {
            return Object.assign({}, goal, {
                title: action.title,
                startDate: action.startDate,
                endDate: action.endDate
            })
        }
        return goal;
    });
}

export const Reducer = (state = initialState, action) => {
    return {
        goals: goals(state, action)
    }
};
