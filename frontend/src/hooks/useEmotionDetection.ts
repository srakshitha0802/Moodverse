import * as faceapi from "face-api.js";
import { useEffect, useRef } from "react";

export const useEmotionDetection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const load = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");
    };
    load();
  }, []);

  const detect = async () => {
    if (!videoRef.current) return null;

    const result = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    return result?.expressions;
  };

  return { videoRef, detect };
};
