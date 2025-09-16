import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import planeAnimation from "../../assets/features/paperplane.json"; // your lottie JSON

export default function LoadingPlane({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true); // start fade
      setTimeout(() => onFinish(), 800); // wait for transition then remove
    }, 2000); // show for 2s
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={`splash-screen ${fadeOut ? "fade-out" : ""}`}>
      <Lottie animationData={planeAnimation} loop />
    </div>
  );
}
