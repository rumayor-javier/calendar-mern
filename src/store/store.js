import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./ui";
import { calendarSlice } from "./calendar";

export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        calendar: calendarSlice.reducer,
    },
    /*
    Redux Toolkit allows us to configure middleware in the store directly
    instead of adding it to the store enhancer
    https://redux-toolkit.js.org/api/configureStore
    Dates are not serializable, so we need to disable the serializableCheck middleware
    */
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})