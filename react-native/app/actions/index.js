// import * as GoalActions from './goals';

export const EDIT_GOAL = 'EDIT_GOAL';

export function editGoal(id, title, startDate, endDate) {
    return {
        type: EDIT_GOAL,
        id,
        title,
        startDate,
        endDate
    }
}

export const ActionCreators = Object.assign({},
    editGoal
);