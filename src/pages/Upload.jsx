import React, { useState, useEffect } from "react";
// import axios from "axios";
import Header from "../components/layout/Header";
import MedicalReport from "./MedicalReport";
import Lottie from "lottie-react";
import bubbleAnimation from "../assets/features/bubbleLoading.json";
import localization from "../assets/constants/localization";
import dummyReport from "../assets/dummyReport.json";

// Material UI imports
import {
  Box,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Stack,
  Paper,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

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
  }, [showLoader, uploadLoaderSteps.length]);

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
    setTimeout(() => {
      setReportData(dummyReport);
      setShowLoader(false);
      setError("");
    }, 2600);
    // const formData = new FormData();
    // formData.append("file", file);
    // formData.append("userId", "test-user-123");

    // try {
    //   const res = await axios.post(
    //     "https://mediAi-backend-production.up.railway.app/api/reports/upload",
    //     formData,
    //     {
    //       headers: { "Content-Type": "multipart/form-data" },
    //     }
    //   );
    //   setReportData(res.data);
    //   setShowLoader(false);
    //   setError("");
    // } catch (err) {
    //   let errorMsg = "Upload failed: ";

    //   if (err.response) {
    //     errorMsg += `Server responded with ${
    //       err.response.status
    //     }: ${JSON.stringify(err.response.data)}`;
    //   } else if (err.request) {
    //     errorMsg += "No response received from server. " + err.message;
    //   } else {
    //     errorMsg += err.message;
    //   }
    //   setError(errorMsg);
    //   setShowLoader(false);
    // }
  };

  return (
    <Box
      className="upload-page-parent"
      sx={{ minHeight: "100vh", bgcolor: "#f6fafc" }}
    >
      <Header />
      <Box maxWidth="sm" mx="auto" sx={{ py: 5 }}>
        {/* Show upload panel if no data and not loading */}
        {!reportData && !showLoader && (
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h4" align="center" mb={2}>
              Upload Medical Report
            </Typography>

            <Stack direction="column" alignItems="center" spacing={2}>
              <Button
                variant="contained"
                component="label"
                startIcon={<CloudUploadIcon />}
                sx={{ fontWeight: 600, px: 4, py: 1.5, fontSize: 18 }}
              >
                Select File
                <input
                  type="file"
                  hidden
                  accept="application/pdf,image/*"
                  onChange={handleFileChange}
                />
              </Button>
              {/* Show file information */}
              {file && (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <InsertDriveFileIcon color="info" />
                  <Typography variant="body1">{file.name}</Typography>
                </Stack>
              )}
              <Button
                variant="outlined"
                color="primary"
                onClick={handleUpload}
                disabled={!file}
                sx={{ width: "50%", mt: 1, fontWeight: 600 }}
              >
                Upload
              </Button>
              {/* Show error message */}
              {error && (
                <Alert severity="error" sx={{ width: "100%", mt: 1 }}>
                  {error}
                </Alert>
              )}
            </Stack>
          </Paper>
        )}

        {/* Show loader animation and steps */}
        {showLoader && (
          <Box
            className="bubble-animation-loader"
            sx={{ textAlign: "center", py: 4 }}
          >
            <Lottie
              animationData={bubbleAnimation}
              loop
              style={{ width: 220, margin: "0 auto" }}
            />
            <CircularProgress color="primary" sx={{ mt: 3, mb: 2 }} />
            <Box className="loader-text" mt={2}>
              <Typography variant="h6" color="primary">
                {uploadLoaderSteps[currentStep]}
              </Typography>
            </Box>
          </Box>
        )}

        {/* Show medical report result */}
        {reportData && <MedicalReport data={reportData} />}
      </Box>
    </Box>
  );
};

export default Upload;
