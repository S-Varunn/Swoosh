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
import mp3 from "./assets/mp3.svg";
import gif from "./assets/gif.svg";
import Countdown from "./Countdown";
import download from "downloadjs";

const Download = () => {
  const [fileData, setFileData] = useState({});
  const [file, setFile] = useState({});
  const [dispFileName, setDispFileName] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [imgFormat, setImgFormat] = useState("");
  const [img, setImg] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(null);
  var baseUrl = window.location.href;
  var id = baseUrl.substring(baseUrl.lastIndexOf("=") + 1);
  let timeLeftValid;

  useEffect(() => {
    try {
      fetchFileDetails();
      fetchFile();
      handlePreFetch();
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if ((fileData?.ValidTillDate && timeLeft) || timeLeftValid) countDown();
  }, [fileData]);

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

  const handlePreFetch = () => {
    Axios.get(`${initObject.url}/downloads/${id}`);
  };
  const handleDownload = async () => {
    /* const result = Axios.get(`${initObject.url}/getFile/${id}`);
    console.log((await result).data);
    setDownloadUrl((await result).data); */
  };

  /* const handleDownload = async () => {
    try {
      const result = Axios.get(`${initObject.url}/getFile/${id}`, {
        responseType: "blob",
      });
      const blob = await result.blob();
      download(blob, id);
 */ /* return download(result.data, id, "image/jpeg"); comment please */
  /* } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log("Error while downloading file. Try again later");
      }
    }
    res.download(path.join(__dirname, `downloadedFiles/${id}`), function (err) {
      console.log(err);
    });
  }; */
  /*  const handleDownload = async () => {
    const res = await fetch("http://localhost:3001/download");
    const blob = await res.blob();
    download(blob, "test.pdf");
  }; */

  //the fetch call for "http://localhost:3001/download"  will not hit '/getdoc'

  /*  app.get("/getdoc", function (req, res) {
    res.download(path.join(__dirname, "files/test.pdf"), function (err) {
      console.log(err);
    });
  }); */
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
      case "mp3":
        setImg(mp3);
        break;
      case "gif":
        setImg(gif);
        break;
      default:
        setImg(other);
    }
  };
  const converter = (str) => {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
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
                    <p>{converter(fileData.UploadedDate)}</p>
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
          <a
            href="https://boatfinancialservices.com/CS8591-CN-%20UNIT-II.pdf"
            download
          >
            Click here
          </a>
        </div>
      </div>
    </div>
  );
};

export default Download;
