import {
    FETCH_HABITS_STARTED, FETCH_HABITS_SUCCESS, FETCH_HABITS_FAIL,
    EDIT_HABIT_STARTED, EDIT_HABIT_SUCCESS, EDIT_HABIT_FAIL
} from './types'

import * as firebase from 'firebase';

export const fetchHabitsStarted = (uid) => {
    return {
        type: FETCH_HABITS_STARTED,
        fetching: true,
        uid: uid
    }
};

export const fetchHabitsSuccess = (items) => {
    return {
        type: FETCH_HABITS_SUCCESS,
        fetching: false,
        items: items
    }
};


export const fetchHabitsFail = () => {
    return {
        type: FETCH_HABITS_FAIL,
        fetching: false,
    }
};

export const fetchHabits = (uid) => {
    return (dispatch) => {
        dispatch(fetchHabitsStarted(uid))
        return firebase.database()
            .ref('accounts/' + uid + '/habits')
            .once('value')
            .then((habits) => {
                const items = habits.val();
                const normalizedItems = normalizeHabitsObject(items)
                console.log("fetched habits: ", normalizedItems);
                dispatch(
                    fetchHabitsSuccess(
                        normalizedItems
                    )
                )
                return normalizedItems;
            })
            .catch((error) => {
                console.log("Cannot fetch habits: ", error);
                dispatch(fetchHabitsFail());
            })
    }
}

const normalizeHabitsObject = (habits) =>{
    habits = (habits === null || habits === undefined)? [] : habits;
    return Object.keys(habits).map(
        (key) => {
            return {
                id: key,
                title: habits[key].title,
                startDate: habits[key].startDate,
                endDate: habits[key].endDate
            }
        }
    )
}

export const editHabitStarted = () => {
    return {
        type: EDIT_HABIT_STARTED,
        fetching: true,
    }
};

export const editHabitSuccess = (item) => {
    return {
        type: EDIT_HABIT_SUCCESS,
        fetching: false,
        item: item
    }
};


export const editHabitFail = () => {
    return {
        type: EDIT_HABIT_FAIL,
        fetching: false,
    }
};

export const editHabit = (uid, habit) => {
    //not waiting for async to finish
    //does not save to store the new edited habit
    //TODO: fix this
    return (dispatch) => {
        dispatch(editHabitStarted());
        return firebase.database()
            .ref('/accounts/' + uid + '/habits/' + habit.id)
            .set({
                title: habit.title,
                startDate: habit.startDate,
                endDate: habit.endDate
            })
            .then((item) => {
                // console.log("Edit success: ", item);
                dispatch(editHabitSuccess({}))
            })
            .catch((error => {
                console.log("Could not edit habit: ", error);
            }))
    }
}

