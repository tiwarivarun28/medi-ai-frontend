import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", "test-user-123");

    try {
      const res = await axios.post(
        "http://localhost:8080/api/reports/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Always store as string so React can render
      let dataStr;
      if (typeof res.data === "object") {
        dataStr = JSON.stringify(res.data, null, 2); // pretty JSON
      } else {
        dataStr = res.data; // plain string
      }

      setResponse(dataStr);
      console.log("Server response:", res.data); // log raw (object or string)
    } catch (error) {
      console.error("Upload error:", error);
      setResponse("Error uploading file");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload Medical Report</h2>
      <input type="file" accept=".pdf,image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: "10px" }}>
        Upload
      </button>
      {response && (
        <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
          <h3>Server Response:</h3>
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
};

export default Upload;
