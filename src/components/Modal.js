import React from "react";
import { useState } from "react";
import "../components/Modal.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Modal = ({ closeModal, modalSubmit, onClickHandler }) => {
  const [data, setData] = useState({});
  const [name, setName] = useState("Anonymous");
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [startDate, setStartDate] = useState(tomorrow);

  const submitModal = () => {
    let currData = { ...data, senderName: name, validTill: startDate };
    setData({ ...data, senderName: name, validTill: startDate });
    closeModal(false);
    modalSubmit(true);
    onClickHandler(currData);
  };

  return (
    <div className="modalBackground">
      <div className="modal-container">
        <div className="cross-button">
          <button
            id="close"
            onClick={() => {
              closeModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="modal-content">
          <div className="modal-header">Everything in here is Optional!</div>
          <div className="choose-user">
            Sender Name :{" "}
            <input
              className="input-box"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="choose-validtilldate">
            <div style={{ width: "85px", marginTop: "10px" }}>Valid Till :</div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              timeFormat="hh:mm aa"
              timeIntervals={60}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </div>
        </div>
        <div style={{ width: "100%", position: "relative" }}>
          <button className="submit-modal" onClick={() => submitModal()}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
