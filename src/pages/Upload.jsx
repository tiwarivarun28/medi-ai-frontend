import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/layout/Header";
import MedicalReport from "./MedicalReport";
import Lottie from "lottie-react";
import bubbleAnimation from "../assets/features/bubbleLoading.json";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import localization from "../assets/constants/localization";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const uploadLoaderSteps = localization.uploadLoaderSteps;

  // simple helper to create a userId (try crypto.randomUUID first)
  const createUserId = () => {
    try {
      if (window?.crypto?.randomUUID) return window.crypto.randomUUID();
    } catch (e) {}
    return `uid-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  };

  // connect and subscribe, returns the client instance
  const connectAndSubscribe = (userId, onMessage) => {
    return new Promise((resolve, reject) => {
      const client = new Client({
        reconnectDelay: 5000,
        webSocketFactory: () =>
          new SockJS("https://mediAi-backend-production.up.railway.app/ws"),
      });

      client.onConnect = () => {
        client.subscribe(`/medicalReportTopic/${userId}`, (msg) => {
          console.log("result via medicalReportTopic websocket", msg.body);
          onMessage(msg.body);
        });
        setStompClient(client);
        resolve(client);
      };

      client.onStompError = (frame) => {
        reject(new Error(frame?.body || "STOMP error"));
      };

      client.activate();
    });
  };

  useEffect(() => {
    // cleanup on unmount: disconnect stomp client if present
    return () => {
      if (stompClient) {
        try {
          stompClient.deactivate();
        } catch (e) {}
      }
    };
  }, [stompClient]);
  useEffect(() => {
    if (loading) {
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
  }, [loading, uploadLoaderSteps.length]);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first!");
      return;
    }

    setError("");
    setLoading(true);
    setReportData(null);

    const userId = createUserId();

    // message handler
    const onMessage = (body) => {
      const payload = JSON.parse(body);
      if (!payload) return;

      if (payload.error) {
        setError(payload.message || payload.error);
        setLoading(false);
        return;
      }

      // partial = has test_summary, final = has overall_finding
      if (payload.overall_finding || payload.overallFinding) {
        setReportData(payload);
        setLoading(false);
      } else {
        setReportData(payload); // show partial
        setLoading(false);
      }
    };

    try {
      // 1) subscribe before upload
      await connectAndSubscribe(userId, onMessage);

      // 2) upload file (server will send partial + final to the topic)
      const fd = new FormData();
      fd.append("file", file);
      fd.append("userId", userId);

      await axios.post(
        "https://mediAi-backend-production.up.railway.app/api/reports/upload",
        fd,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 120000,
        }
      );

      // note: we don't wait for server processing here; results come via WS
    } catch (err) {
      console.error("Upload/subscribe error", err);
      setError(err?.message || "Upload failed");
      setLoading(false);
      if (stompClient) {
        try {
          stompClient.deactivate();
        } catch (e) {}
        setStompClient(null);
      }
    }
  };

  return (
    <div className="upload-page-parent">
      <Header />

      {!reportData && !loading && (
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

      {loading && (
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
          {error && <p className="error-msg">{error}</p>}
        </div>
      )}

      {reportData && <MedicalReport data={reportData} />}
    </div>
  );
};

export default Upload;
