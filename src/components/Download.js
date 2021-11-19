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

const Download = () => {
  const [fileData, setFileData] = useState({});
  const [file, setFile] = useState({});
  const [dispFileName, setDispFileName] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [imgFormat, setImgFormat] = useState("");
  const [img, setImg] = useState("");

  var baseUrl = window.location.href;
  var id = baseUrl.substring(baseUrl.lastIndexOf("=") + 1);

  useEffect(() => {
    try {
      fetchFileDetails();
      fetchFile();
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(countDown());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const countDown = () => {
    const countDate = new Date(fileData.ValidTillDate).getTime();
    const currDate = new Date().getTime();
    const gap = countDate - currDate;

    const sec = 1000;
    const min = sec * 60;
    const hr = min * 60;
    const day = hr * 24;

    let timeLeft = {};
    if (gap > 0) {
      timeLeft = {
        day: Math.floor(gap / day),
        hours: Math.floor((gap % day) / hr),
        minutes: Math.floor((gap % hr) / min),
        seconds: Math.floor((gap % min) / sec),
      };
    }

    return timeLeft;
  };
  setInterval(countDown, 1000);

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
        <div className="download-avail"></div>
        <div className="download-button">
          <button className="mybtn">Download</button>
        </div>
      </div>
    </div>
  );
};

export default Download;
