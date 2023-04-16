import { useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { Navbar, CalendarEvent, CalendarModal, FabAddNew } from "../components";
import { localizer, getMessages } from "../../helpers";
import { useUiStore, useCalendarStore } from "../../hooks";

export const CalendarPage = () => {
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const onDoubleClick = (e) => {
    openDateModal();
  };

  const onSelect = (e) => {
    setActiveEvent(e);
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

      <div className="container">
        <Calendar
          localizer={localizer}
          events={events}
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
        <FabAddNew />
      </div>
    </>
  );
};
