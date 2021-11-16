import React, { useState } from "react";
import "./Upload.css";
import MyDropzone from "./Dropbox";
import axios from "axios";
import { initObject } from "../initVar";
import copyIcon from "../components/copyToClipboard.svg";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [link, setLink] = useState({});
  const [active, setActive] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");

  const onChangeHandler = (event) => {
    let file = event.target.files[0];
    setSelectedFile(file);
    console.log(event.target.files[0]);
  };

  const onClickHandler = () => {
    const data = new FormData();
    console.log("myformdata", data);
    data.append("file", selectedFile);

    axios
      .post("http://localhost:8000/", data, {
        // receive two parameter endpoint url ,form data
      })
      .then((res) => {
        if (res.status === 200) {
          setSubmitted(true);
        }
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
            <MyDropzone />
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
                    onChange={onChangeHandler}
                  />
                </div>
                <br />
                <button
                  className="mybtn"
                  style={{ position: "absolute", right: "35px" }}
                  onClick={(e) => {
                    onClickHandler();
                    e.preventDefault();
                  }}
                >
                  Submit
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
                    <div className="copyToClip">{copyMessage}</div>
                  </div>
                ) : null}
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  );
};

export default Upload;
