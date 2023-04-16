import { useEffect, useMemo, useState } from "react";
import { addHours, differenceInSeconds } from "date-fns";
import Modal from "react-modal";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { useCalendarStore, useUiStore } from "../../hooks";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { setActiveEvent, activeEvent, startSavingEvent } = useCalendarStore();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 1),
  });

  const titleClass = useMemo(() => {
    if (!formSubmitted) return "";
    return formValues.title.trim().length > 0 ? "" : "is-invalid";
  }, [formValues.title, formSubmitted]);

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChange = (e, changing) => {
    setFormValues({
      ...formValues,
      [changing]: e,
    });
  };

  const onCloseModal = () => {
    closeDateModal();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const dateDifference = differenceInSeconds(
      formValues.end,
      formValues.start
    );
    if (isNaN(dateDifference) || dateDifference <= 0) {
      Swal.fire(
        "Dates Error",
        "The end date must be greater than the start date",
        "error"
      );
      return;
    }
    if (formValues.title.trim().length <= 0) return;

    await startSavingEvent(formValues);
    closeDateModal();
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className={"modal"}
      overlayClassName={"modal-fondo"}
      closeTimeoutMS={200}
    >
      <div>
        <h1> New event </h1>
        <hr />
        <form className="container" onSubmit={onSubmit}>
          <div className="form-group mb-2">
            <label>Starting date and time</label>
            <DatePicker
              className="form-control"
              placeholder="Starting date"
              selected={formValues.start}
              onChange={(ev) => onDateChange(ev, "start")}
              dateFormat="Pp"
              showTimeSelect
            />
          </div>

          <div className="form-group mb-2">
            <label>Ending date and time</label>
            <DatePicker
              minDate={formValues.start}
              className="form-control"
              placeholder="Starting date"
              selected={formValues.end}
              onChange={(ev) => onDateChange(ev, "end")}
              dateFormat="Pp"
              showTimeSelect
            />
          </div>

          <hr />
          <div className="form-group mb-2">
            <label>Title and notes</label>
            <input
              type="text"
              className={`form-control ${titleClass}`}
              placeholder="Event title"
              name="title"
              autoComplete="off"
              value={formValues.title}
              onChange={onInputChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              Short description
            </small>
          </div>

          <div className="form-group mb-2">
            <textarea
              type="text"
              className="form-control"
              placeholder="Notes"
              rows="5"
              name="notes"
              value={formValues.notes}
              onChange={onInputChange}
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">
              Additional information
            </small>
          </div>

          <button type="submit" className="btn btn-success btn-block">
            <i className="far fa-save"></i>
            &nbsp;
            <span>Save</span>
          </button>
        </form>
      </div>
    </Modal>
  );
};
