import React from "react";
import { useState } from "react";
import "../components/Modal.css";
const Modal = ({ closeModal, modalSubmit, onClickHandler }) => {
  const { data, setData } = useState({ hi: "Hi Im data" });
  const submitModal = () => {
    closeModal(false);
    modalSubmit(true);
    onClickHandler(data);
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
            Sender Name : <input className="input-box" type="text" />
          </div>
          <div className="choose-validtilldate">Valid Till : </div>
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
