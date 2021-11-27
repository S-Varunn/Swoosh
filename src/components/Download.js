import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { initObject } from "../initVar";
import "../components/Download.css";
import word from "./assets/word.svg";
import ppt from "./assets/ppt.svg";
import pdf from "./assets/pdf.svg";
import other from "./assets/file.svg";
import jpg from "./assets/jpg.svg";
import png from "./assets/png.svg";
import jpeg from "./assets/jpeg.png";
import svg from "./assets/svg.svg";
import Countdown from "./Countdown";

const Download = () => {
  const [fileData, setFileData] = useState({});
  const [file, setFile] = useState({});
  const [dispFileName, setDispFileName] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [imgFormat, setImgFormat] = useState("");
  const [img, setImg] = useState("");

  var baseUrl = window.location.href;
  var id = baseUrl.substring(baseUrl.lastIndexOf("=") + 1);
  let timeLeftValid;

  useEffect(() => {
    try {
      fetchFileDetails();
      fetchFile();
      sendEncodedFileName(id);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if ((fileData?.ValidTillDate && timeLeft) || timeLeftValid) countDown();
  }, [fileData]);

  const sendEncodedFileName = (id) => {
    const data = { id };
    Axios.post(`${initObject.url}/encodedFileName`, data).then((res) => {
      if (res.status === 200) {
        console.log(res.statusText);
      }
    });
  };

  const countDown = (data) => {
    const countDate = new Date(data?.ValidTillDate).getTime();
    const currDate = new Date().getTime();
    const gap = countDate - currDate;
    let timeLeftCalc;
    timeLeftCalc = gap / (1000 * 60 * 60 * 24);
    setTimeLeft(timeLeftCalc);
    timeLeftValid = timeLeftCalc;
    console.log(timeLeftValid);
  };
  let imgFor;

  const fetchFileDetails = async () => {
    const res = await Axios.get(`${initObject.url}/showDetails/myInfo/${id}`);
    console.log(res);
    if (res.status === 200) {
      setFileData(res.data);
      setDispFileName(start_and_end(res.data?.originalFilename));
      imgFor = res.data?.iconFileFormat;
      setImgFormat(res.data?.iconFileFormat);
      fileIconSelect();
      if (res.data.ValidTillDate) {
        countDown(res.data);
      }
    }
  };
  const fetchFile = async () => {
    const res = await Axios.get(`${initObject.url}/showDetails/${id}`);
    console.log(res);
    if (res.status === 200) {
      setFile(res.data);
    }
  };

  function start_and_end(str) {
    if (str.length > 30) {
      return str.substr(0, 25) + "..." + str.substr(str.length - 8, str.length);
    }
    return str;
  }
  /*  import "../../../../Swoosh-backend/downloadedFiles/93805ee07f6489cd059b3b460466bbbd.jpg"; */
  const handleDownload = () => {
    Axios.get(`${initObject.url}/download`);
  };
  const fileIconSelect = () => {
    switch (imgFor) {
      case "pdf":
        setImg(pdf);
        break;
      case "pptx":
        setImg(ppt);
        break;
      case "ppt":
        setImg(ppt);
        break;
      case "doc":
        setImg(word);
        break;
      case "docx":
        setImg(word);
        break;
      case "svg":
        setImg(svg);
        break;
      case "jpg":
        setImg(jpg);
        break;
      case "jpeg":
        setImg(jpeg);
        break;
      case "png":
        setImg(png);
        break;
      default:
        setImg(other);
    }
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
                {fileData.senderName ? (
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
                ) : (
                  <></>
                )}
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
          <Countdown timeLeft={timeLeft !== 0 ? timeLeft : timeLeftValid} />
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
};

export default Download;
