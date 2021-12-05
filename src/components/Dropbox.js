import React from "react";
import { useDropzone } from "react-dropzone";
import "./Dropbox.css";
document.querySelector("body").addEventListener("mousemove", eyeball);
function eyeball(event) {
  const eye = document.querySelectorAll(".eye");
  eye.forEach(function (eye) {
    let x = eye.getBoundingClientRect().left + eye.clientWidth / 2;
    let y = eye.getBoundingClientRect().top + eye.clientHeight / 2;
    let radian = Math.atan2(event.pageX - x, event.pageY - y);
    let rotation = radian * (180 / Math.PI) * -1 + 90;
    eye.style.transform = "rotate(" + rotation + "deg)";
  });
}

function MyDropzone({ setSelectedFile }) {
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({ multiple: false });

  if (acceptedFiles.length > 0) setSelectedFile(acceptedFiles[0]);
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path}-{(file.size / 1000000).toPrecision(2)} MB
    </li>
  ));
  return (
    <section>
      <div className="dropbox" {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
        <div>
          <div className="minion">
            <div className="goggle-strap left"></div>
            <div className="goggle-strap right"></div>
            <div className="goggle-strap-link left"></div>
            <div className="goggle-strap-link right"></div>
            <div className="goggle-frame left">
              <div className="goggle">
                <div className="eye"></div>
              </div>
            </div>
            <div className="goggle-frame right">
              <div className="goggle">
                <div className="eye"></div>
              </div>
            </div>
            <div className="mouth"></div>
          </div>
        </div>
      </div>
      <div className="filename">{files}</div>
    </section>
  );
}

export default MyDropzone;
