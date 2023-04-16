import { useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { addHours } from "date-fns";
import { Navbar, CalendarEvent, CalendarModal } from "../components";
import { localizer, getMessages } from "../../helpers";

const myEventsList = [
  {
    user: {
      name: "User 1",
    },
    title: "Very long title",
    notes: "Some notes here",
    start: new Date(),
    end: addHours(new Date(), 2),
  },
];

export const CalendarPage = () => {
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const onDoubleClick = (e) => {
    console.log(2);
  };

  const onSelect = (e) => {
    console.log(1);
  };

  const onViewChanged = (e) => {
    localStorage.setItem("lastView", e);
    setLastView(e);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#367CF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };

  return (
    <>
      <Navbar />

      <Calendar
        localizer={localizer}
        events={myEventsList}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 100px)" }}
        culture={"en-US"}
        messages={getMessages()}
        eventPropGetter={eventStyleGetter}
        components={{ event: CalendarEvent }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal />
    </>
  );
};
