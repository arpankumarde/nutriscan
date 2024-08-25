import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { BsFillCameraFill } from "react-icons/bs";
import { RxReset } from "react-icons/rx";
import axios from "axios";
import Markdown from "react-markdown";

const Scanner = () => {
  const webcamRef = useRef(null);
  const [imageData, setImageData] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageData(imageSrc);
    // console.log(imageSrc);
    analyseImage(imageSrc);
  };

  const resetImage = () => {
    setImageData(null);
  };

  const analyseImage = async (imageSrc) => {
    // send the image data to the server as form data as binary file

    // convert imagesrc which is a base64 string to bin file
    const blob = await fetch(imageSrc).then((res) => res.blob());

    const formData = new FormData();
    formData.append("image", blob, "image.png");
    try {
      const response = await axios.post(
        "https://nutriscan-backend-1.onrender.com/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFeedback(response?.data?.response);
      console.log(response?.data?.response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className>
        {imageData ? (
          <img className="object-fill" src={imageData} alt="Captured Image" />
        ) : (
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/png"
            className="border"
            videoConstraints={{
              width: 720,
              height: 720,
              facingMode: "environment",
            }}
          />
        )}
      </div>
      <div className="flex gap-4 items-center w-full">
        <button
          className="flex justify-center items-center gap-2 bg-gray-200 rounded-lg p-4 w-1/2"
          onClick={captureImage}
        >
          <BsFillCameraFill size={20} /> Capture
        </button>
        <button
          className="flex justify-center items-center gap-2 bg-gray-200 rounded-lg p-4 w-1/2"
          onClick={resetImage}
        >
          <RxReset size={22} /> Reset
        </button>
      </div>
      {feedback && <Markdown>{feedback}</Markdown>}
    </div>
  );
};

export default Scanner;
