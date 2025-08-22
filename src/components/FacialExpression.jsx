import React, { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

const FacialExpression = ()=> {
  const videoRef = useRef();
  const canvasRef = useRef();

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => { videoRef.current.srcObject = stream; })
      .catch((err) => console.error("Camera error:", err));
  };
  const loadModels = async () => {
    const MODEL_URL = "/models"; // public/models
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
    ]);
    startVideo();
  };

  const detect = async () => {
    if (!videoRef.current || videoRef.current.readyState !== 4) return;

    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (!detections || detections.length === 0) return; // ✅ Skip if no face

    const dims = {
      width: videoRef.current.videoWidth,
      height: videoRef.current.videoHeight
    };

    faceapi.matchDimensions(canvasRef.current, dims);
    const resized = faceapi.resizeResults(detections, dims);

    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, dims.width, dims.height); // ✅ Clear old drawings
    faceapi.draw.drawDetections(canvasRef.current, resized);
    faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
  };

  useEffect(() => {
    loadModels();
    const interval = setInterval(detect, 200); // Run every 200ms
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        width="720"
        height="560"
        style={{ border: "2px solid black" }}
      />
      <canvas
        ref={canvasRef}
        width="720"
        height="560"
        style={{ position: "absolute", top: 0, left: 0 }}
      />
    </div>
  );
}

export default FacialExpression;