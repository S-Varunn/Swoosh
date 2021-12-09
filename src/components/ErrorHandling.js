import React from "react";
import error from "../components/assets/error.svg";
import skullgif from "../components/assets/skull.gif";

import "../components/ErrorHandling.css";
function ErrorHandling({ message, subMessage, code }) {
  if (code === 3000) {
    document.body.style.background =
      "radial-gradient(rgb(249 147 30 / 51%), rgb(255 135 64))";
  }
  if (code === 6000)
    document.body.style.background = "radial-gradient(#ff00005c, #ff1c1c)";

  return (
    <div>
      <div className="error-image">
        {code === 3000 ? (
          <img
            className="skull-error"
            alt="Skull will haunt you"
            src={skullgif}
          />
        ) : (
          <img className="main-error" alt="Error" src={error} />
        )}
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
