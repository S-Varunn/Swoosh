import React from "react";
import error from "../components/assets/error.svg";

import "../components/ErrorHandling.css";
function ErrorHandling({ message, subMessage, code }) {
  if (code === 3000) {
    document.body.style.background = "radial-gradient(#ff880096, #ff711c)";
  }
  if (code === 6000)
    document.body.style.background = "radial-gradient(#ff00005c, #ff1c1c)";

  return (
    <div>
      <div className="error-image">
        <img className="main-error" alt="Error" src={error} />
      </div>
      <div>
        <div className="text-div">
          <h2 className={`${code === 3000 ? "main-text-warn" : "main-text"}`}>
            {message}
          </h2>
          <p className="sub-text">{subMessage}</p>
        </div>
      </div>
    </div>
  );
}
export default ErrorHandling;
