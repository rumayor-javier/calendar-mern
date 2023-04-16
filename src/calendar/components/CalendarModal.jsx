import { useState } from "react";
import { addHours } from "date-fns";
import Modal from "react-modal";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  const [isModalOpen, setIsModalOpen] = useState(true);

  const [formValues, setFormValues] = useState({
    title: "Event",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChange = (ev, changing) => {
    setFormValues({
      ...formValues,
      [changing]: ev,
    });
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className={"modal"}
      overlayClassName={"modal-fondo"}
      closeTimeoutMS={200}
    >
      <div>
        <h1> New event </h1>
        <hr />
        <form className="container">
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
              className="form-control"
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

          <button type="submit" className="btn btn-outline-primary btn-block">
            <i className="far fa-save"></i>
            &nbsp;
            <span>Save</span>
          </button>
        </form>
      </div>
    </Modal>
  );
};
