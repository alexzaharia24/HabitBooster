// import * as HabitActions from './habits';

export const EDIT_GOAL = 'EDIT_GOAL';

export function editHabit(id, title, startDate, endDate) {
    return {
        type: EDIT_GOAL,
        id,
        title,
        startDate,
        endDate
    }
}

export const ActionCreators = Object.assign({},
    editHabit
);