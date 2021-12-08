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
import DownloadPage from "./DownloadPage";
import ErrorHandling from "./ErrorHandling";

const Download = () => {
  const [fileData, setFileData] = useState({});
  const [response, setResponse] = useState({});
  const [dispFileName, setDispFileName] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [imgFormat, setImgFormat] = useState("");
  const [img, setImg] = useState(other);
  var baseUrl = window.location.href;
  var id = baseUrl.substring(baseUrl.lastIndexOf("=") + 1);
  let timeLeftValid;

  useEffect(() => {
    try {
      fetchFileDetails();
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
  };
  let imgFor;

  const fetchFileDetails = async () => {
    try {
      const res = await Axios.get(`${initObject.url}/showDetails/myInfo/${id}`);
      if (res.status === 200) {
        setFileData(res.data);
        setResponse(res);
        setDispFileName(start_and_end(res.data?.originalFilename));
        imgFor = res.data?.iconFileFormat;
        setImgFormat(res.data?.iconFileFormat);
        fileIconSelect();
        if (res?.data?.ValidTillDate) {
          countDown(res.data);
        }
      }
    } catch (err) {
      setResponse(err.response);
    }
  };

  function start_and_end(str) {
    if (str?.length > 30) {
      return (
        str?.substr(0, 25) + "..." + str?.substr(str?.length - 8, str?.length)
      );
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
  if (response?.data?.code === 405) {
    return (
      <ErrorHandling
        message={"Please wait for some time!"}
        subMessage={"We are looking for your file..."}
        code={3000}
      />
    );
  } else {
    if (response.status === 200) {
      document.body.style.background = "radial-gradient(#ffdc96, #fd8f00)";

      return (
        <div>
          <DownloadPage
            id={id}
            img={img}
            dispFileName={dispFileName}
            fileData={fileData}
            imgFormat={imgFormat}
            timeLeft={timeLeft}
            timeLeftValid={timeLeftValid}
          />
        </div>
      );
    } else {
      if (response?.status === 410) {
        return (
          <ErrorHandling
            message={"Your link has expired!"}
            subMessage={
              "Please contact the person who has shared the link with you."
            }
            code={6000}
          />
        );
      } else {
        return (
          <ErrorHandling
            message={"Please wait for some time!"}
            subMessage={"We are looking for your file..."}
            code={3000}
          />
        );
      }
    }
  }
};

export default Download;
