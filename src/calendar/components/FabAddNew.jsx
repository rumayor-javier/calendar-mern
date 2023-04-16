import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";

export const FabAddNew = () => {
  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const onClickNew = () => {
    setActiveEvent({
      title: "",
      notes: "",
      user: {
        _id: "123",
        name: "User 1",
      },
      start: new Date(),
      end: addHours(new Date(), 1),
      bgColor: "#fafafa",
    });
    openDateModal();
  };

  return (
    <button className="btn btn-primary fab" onClick={onClickNew}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
