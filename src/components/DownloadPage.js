import React from "react";
import Axios from "axios";
import { initObject } from "../initVar";
import { saveAs } from "file-saver";
import Countdown from "./Countdown";

function DownloadPage(props) {
  const {
    id,
    img,
    dispFileName,
    fileData,
    imgFormat,
    timeLeft,
    timeLeftValid,
  } = props;
  const converter = (str) => {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  };
  const handleDownload = async () => {
    Axios.get(`${initObject.url}/downloaded/${id}`, {
      responseType: "blob",
    }).then((response) => {
      let binaryData = [];
      binaryData.push(response.data);
      saveAs(new Blob(binaryData), fileData.originalFilename);
    });
  };
  return (
    <div className="download-page">
      <div className="download-page-container">
        <div className="main-card-container">
          <div className="card-header">
            <p className="card-heading">Your File Details</p>
            <div className="card-heading-icon">
              <img className="file-icon" alt="imageOfFileType" src={img} />
            </div>
          </div>

          <div className="card-body">
            <div className="file-details-container">
              <div className="file-details">
                <div className="file-items" id="fileName">
                  <div>
                    <p>
                      <b>Filename: </b>
                    </p>
                  </div>
                  <div className="additional">
                    <p> {dispFileName}</p>
                  </div>
                </div>
                <div className="file-items">
                  <div>
                    <p>
                      <b>Size:</b>
                    </p>
                  </div>
                  <div className="additional">
                    <p>{fileData?.fileSize}</p>
                  </div>
                </div>
                <div className="file-items">
                  <div>
                    <p>
                      <b>FileType:</b>
                    </p>
                  </div>
                  <div className="additional">
                    <p>{imgFormat}</p>
                  </div>
                </div>
                <div className="file-items">
                  <div>
                    <p>
                      <b>File Uploaded at:</b>
                    </p>
                  </div>
                  <div className="additional">
                    <p>{converter(fileData?.UploadedDate)}</p>
                  </div>
                </div>

                <div className="file-items">
                  <div>
                    <p>
                      <b>File uploaded by:</b>
                    </p>
                  </div>
                  <div className="additional">
                    <p>{fileData?.senderName}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="download-area">
        <div className="download-header">
          <p>Your file is ready to download... Kampai!</p>
        </div>
        <div className="download-avail">
          <div className="count-down-header">
            <p className="time-header">Your link valid till :</p>
          </div>
          <Countdown timeLeft={timeLeft !== 0 ? timeLeft : timeLeftValid} />
          <div className="count-down-bottom">
            <p className="time-bottom">Days</p>:
            <p className="time-bottom">Hrs</p>:
            <p className="time-bottom">Mins</p>:
            <p className="time-bottom">Sec</p>
          </div>
        </div>
        <div className="download-button">
          <button
            className="mybtn"
            onClick={() => {
              handleDownload();
            }}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default DownloadPage;
