import React, { useRef } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";

const FacialExpression = ({ songs,setSongs }) => {
const videoRef = useRef();

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Camera error:", err));
  };

  const loadModels = async () => {
    const MODEL_URL = "/models"; // public/models
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]);
    startVideo();
  };

  const detect = async () => {
    if (!videoRef.current || videoRef.current.readyState !== 4) return;

    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (!detections || detections.length === 0) return; // ✅ Skip if no face

    const expressions = detections[0].expressions;

    const highestExpression = Object.keys(expressions).reduce((a, b) =>
      expressions[a] > expressions[b] ? a : b
    );

    console.log("Strongest Expression: ", highestExpression);

    axios
      .get(`http://localhost:3000/song/Songs?mood=${highestExpression}`)
      .then((res) => {
        console.log("API Response:", res.data);

        const songData = Array.isArray(res.data.songInfo)
          ? res.data.songInfo
          : [res.data.songInfo];
        // let copyData = [...songs,...songData];
        setSongs(songData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  loadModels();

  const buttonClick = () => {
    const interval = setTimeout(detect, 200);
    setTimeout(() => clearInterval(interval), 200);
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 text-white gap-6">
      <div className="bg-gray-800 rounded-2xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition-transform duration-300">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-[400px] h-[300px] object-cover rounded-xl border-4 border-gray-600 shadow-md"
        />
        <button
          className="mt-4 cursor-pointer px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-lg font-semibold rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
          onClick={buttonClick}
        >
          🎧 Start Listening
        </button>
      </div>
    </div>
  );
};

export default FacialExpression;

// useEffect(() => {
//   loadModels();
//   const interval = setInterval(detect, 2000); // Run every 200ms
//   return () => clearInterval(interval);
// }, []);

{
  /* <canvas
        ref={canvasRef}
        width="720"
        height="560"
        style={{ position: "absolute", top: 0, left: 0 }}
      /> */
}

// const dims = {
//   width: videoRef.current.videoWidth,
//   height: videoRef.current.videoHeight
// };

// faceapi.matchDimensions(canvasRef.current, dims);
// const resized = faceapi.resizeResults(detections, dims);

// const ctx = canvasRef.current.getContext("2d");
// ctx.clearRect(0, 0, dims.width, dims.height); // ✅ Clear old drawings
// faceapi.draw.drawDetections(canvasRef.current, resized);
// faceapi.draw.drawFaceExpressions(canvasRef.current, resized);