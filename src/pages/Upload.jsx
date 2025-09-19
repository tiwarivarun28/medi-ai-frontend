import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/layout/Header";
import MedicalReport from "./MedicalReport";
import Lottie from "lottie-react";
import bubbleAnimation from "../assets/features/bubbleLoading.json";
import localization from "../assets/constants/localization";
const Upload = () => {
  const [file, setFile] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const uploadLoaderSteps = localization.uploadLoaderSteps;

  // Progressively show steps
  useEffect(() => {
    if (showLoader) {
      setCurrentStep(0); // reset steps
      let i = 0;
      const interval = setInterval(() => {
        if (i < uploadLoaderSteps.length - 1) {
          i++;
          setCurrentStep(i);
        } else {
          clearInterval(interval);
        }
      }, 5000); // 5s delay per step
      return () => clearInterval(interval);
    }
  }, [showLoader]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError(""); // reset error when new file selected
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first!");
      return;
    }
    setShowLoader(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", "test-user-123");

    try {
      const res = await axios.post(
        "https://mediAi-backend-production.up.railway.app/api/reports/upload", //  http://localhost:8080/api/reports/upload
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setReportData(res.data);
      setShowLoader(false);
      setError("");
    } catch (err) {
      let errorMsg = "Upload failed: ";

      if (err.response) {
        errorMsg += `Server responded with ${
          err.response.status
        }: ${JSON.stringify(err.response.data)}`;
      } else if (err.request) {
        errorMsg += "No response received from server. " + err.message;
      } else {
        errorMsg += err.message;
      }
      console.error("Upload error:", err);
      setError(errorMsg);
      setShowLoader(false);
    }
  };

  return (
    <div className="upload-page-parent">
      <Header />

      {!reportData && !showLoader && (
        <div>
          <h2>Upload Medical Report</h2>
          <input
            type="file"
            accept="application/pdf,image/*"
            onChange={handleFileChange}
          />
          <button onClick={handleUpload}>Upload</button>
          {error && <p className="error-msg">{error}</p>}
        </div>
      )}
      {showLoader && (
        <div className="bubble-animation-loader">
          <Lottie animationData={bubbleAnimation} loop />
          <div className="loader-text">
            <ul>
              {uploadLoaderSteps.map(
                (step, index) =>
                  index === currentStep && (
                    <li key={index} className="step">
                      {step}
                    </li>
                  )
              )}
            </ul>
          </div>
        </div>
      )}
      {reportData && <MedicalReport data={reportData} />}
    </div>
  );
};

export default Upload;
