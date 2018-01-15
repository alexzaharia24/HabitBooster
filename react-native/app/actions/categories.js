import {REFRESH_CATEGORIES} from "./types";

export const refreshCategories = (categories) => {
    return {
        type: REFRESH_CATEGORIES,
        items: categories
    }
};