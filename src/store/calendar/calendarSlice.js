import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
    title: "Very long title",
    notes: "Some notes here",
    user: {
        _id: "123",
        name: "User 1",
    },
    start: new Date(),
    end: addHours(new Date(), 1),
    bgColor: "#fafafa",
    _id: new Date().getTime(),
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [tempEvent],
        activeEvent: null,
    },
    reducers: {
        onSetActiveEvent: (state, action) => {
            state.activeEvent = action.payload;
        },
        onAddNewEvent: (state, action) => {
            state.events.push(action.payload);
            state.activeEvent = null;
        },
    }
});


export const { onSetActiveEvent, onAddNewEvent } = calendarSlice.actions;