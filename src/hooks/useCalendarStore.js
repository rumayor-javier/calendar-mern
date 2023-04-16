import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onSetActiveEvent } from "../store";


export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async (calendarEvent) => {
        //TODO: Save event to DB
        if (calendarEvent._id) {
            // Update event
        } else {
            // Create new event
            dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
        }

    }

    return {
        // Properties
        events,
        activeEvent,

        // Methods
        setActiveEvent,
        startSavingEvent,
    }
}
