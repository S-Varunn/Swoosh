import React, { useState, useRef } from "react";
import "./Upload.css";
import MyDropzone from "./Dropbox";
import axios from "axios";
import { initObject } from "../initVar";
import copyIcon from "./assets/copyToClipboard.svg";
import Modal from "../components/Modal";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [link, setLink] = useState({});
  const [active, setActive] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");
  const [fileSelect, setfileSelect] = useState(false);
  const [fileClear, setFileClear] = useState(false);

  const ref = useRef();

  const onChangeHandler = (event) => {
    let file = event.target.files[0];
    setSelectedFile(file);
    console.log(event.target.files[0]);
    setfileSelect(true);
  };

  const fileValidation = () => {
    var fileInput = document.getElementById("file");

    var filePath = fileInput.value;

    // Allowing file type
    var allowedExtensions =
      /(\.mp4\.avi\.ogg\.wmv\.flv\.m4v\.dv\.avchd\.mpeg\.qt\.asf\.wma\.m1v|\.mov|\.odt|\.rtf|\.wps|\.wks|\.wpd)$/i;

    if (allowedExtensions.exec(filePath)) {
      alert("Invalid file type");
      fileInput.value = "";
      setfileSelect(false);
      setOpenModal(false);
      return;
    }
    setOpenModal(true);
  };
  const clearFile = () => {
    ref.current.value = "";
    setfileSelect(false);
    setSelectedFile(null);
    setFileClear(true);
  };
  const onClickHandler = (modalData) => {
    console.log(modalData);
    setOpenModal(false);
    const data = new FormData();
    console.log("myformdata", data);
    data.append("file", selectedFile);
    axios
      .post(`${initObject.url}/`, data, {
        // receive two parameter endpoint url ,form data
      })
      .then((res) => {
        if (res.status === 200) {
          setSubmitted(true);
        }
        console.log(res.statusText);
      });
    axios
      .post(`${initObject.url}/userData`, modalData, {
        // receive two parameter endpoint url ,form data
      })
      .then((res) => {
        // if (res.status === 200) {
        //   setSubmitted(true);
        // }
        console.log(res.statusText);
      });
  };
  const getLink = async () => {
    try {
      const res = await axios.get(`${initObject.url}/getLink`);
      if (res.status === 200) {
        console.log(res);
        setLink(res.data.download);
        setActive(true);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleCopy = (e) => {
    navigator.clipboard
      .writeText(link)
      .then(() => setCopyMessage("Copied to clipboard"))
      .catch(() => setCopyMessage("Cannot copy text"));
  };
  return (
    <>
      <section id="swoosh">
        <h1>Swoosh</h1>
        <div className="container">
          <React.Fragment>
            <MyDropzone
              setSelectedFile={setSelectedFile}
              fileClear={fileClear}
              setFileClear={setFileClear}
              setfileSelect={setfileSelect}
            />
          </React.Fragment>
        </div>
        <div className="manual">
          <form action="/" method="post" encType="multipart/form-data">
            {!submitted ? (
              <div className="choose-file">
                <div className="file-selector">
                  <input
                    type="file"
                    name="file"
                    id="file"
                    ref={ref}
                    onChange={onChangeHandler}
                  />
                </div>
                <br />
                <button
                  className={`${fileSelect ? "mybtn" : "mybtn-disabled"}`}
                  disabled={!fileSelect}
                  style={{ position: "absolute", right: "1px" }}
                  onClick={(e) => {
                    fileValidation();
                    e.preventDefault();
                  }}
                >
                  Next
                </button>
                <button
                  className="mybtn"
                  style={{ position: "absolute", right: "75px" }}
                  onClick={(e) => {
                    clearFile();
                    e.preventDefault();
                  }}
                >
                  Clear
                </button>
              </div>
            ) : (
              <div style={{ position: "relative" }}>
                {!active ? (
                  <div className="get-Link">
                    <button
                      className="mybtn"
                      onClick={(e) => {
                        getLink();
                        e.preventDefault();
                      }}
                    >
                      Get Link
                    </button>
                  </div>
                ) : null}

                {active ? (
                  <div style={{ position: "relative" }}>
                    <div className="link-container">
                      <div>
                        <p className="link-text">{link}</p>
                      </div>
                      <div className="copy-image">
                        <img
                          src={copyIcon}
                          className="copy-icon"
                          alt=""
                          onClick={handleCopy}
                        />
                      </div>
                    </div>
                    <div className="fadeout">
                      <div className="copyToClip">{copyMessage}</div>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </form>
        </div>
        {openModal ? (
          <Modal
            closeModal={setOpenModal}
            modalSubmit={setSubmitted}
            onClickHandler={onClickHandler}
          />
        ) : null}
      </section>
    </>
  );
};

export default Upload;
