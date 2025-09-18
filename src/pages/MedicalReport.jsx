import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import FilterListIcon from "@mui/icons-material/FilterList";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WcIcon from "@mui/icons-material/Wc";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const MedicalReport = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [filteredData, setFilteredData] = useState({});
  const [filters, setFilters] = useState([]); // now array instead of single
  const [showMoreFindings, setShowMoreFindings] = useState(false);

  useEffect(() => {
    setFilteredData(data.test_summary);
  }, [data]);

  const handleOpen = (testName, testData) => {
    setSelectedTest({ testName, testData });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const statusIcon = (status) => {
    switch (status) {
      case "Normal":
        return <CheckCircleOutlineIcon className="chip-icon normal" />;
      case "Low":
        return <ErrorOutlineIcon className="chip-icon low" />;
      case "High":
        return <WarningAmberIcon className="chip-icon high" />;
      default:
        return null;
    }
  };

  // toggle filter selection
  const toggleFilter = (status) => {
    setFilters((prev) =>
      prev.includes(status)
        ? prev.filter((f) => f !== status)
        : [...prev, status]
    );
  };

  const applyFilter = () => {
    if (filters.length === 0) {
      setFilteredData(data.test_summary);
    } else {
      const filtered = Object.fromEntries(
        Object.entries(data.test_summary).filter(([, details]) =>
          filters.includes(details[3])
        )
      );
      setFilteredData(filtered);
    }
    setFilterOpen(false);
  };

  const clearFilter = () => {
    setFilters([]);
    setFilteredData(data.test_summary);
    setFilterOpen(false);
  };

  return (
    <div className="medical-report">
      {/* Patient Details */}
      <div className="section">
        <div className="card patient-card">
          <div className="patient-header">
            <div className="avatar">
              <AccountCircleIcon className="avatar-icon" />
            </div>
            <div>
              <p className="patient-name">{data.patient.name}</p>
              <p className="patient-sub">
                Report Date: {data.patient.report_date}
              </p>
            </div>
          </div>
          <div className="patient-info-grid">
            <div className="patient-info-chip">
              <CalendarTodayIcon className="chip-icon" />
              {data.patient.age}
            </div>
            <div className="patient-info-chip">
              <WcIcon className="chip-icon" />
              {data.patient.gender}
            </div>
          </div>
        </div>
      </div>

      {/* Overall Findings */}
      <div className="section">
        <div className="section-title">Overall Findings</div>
        <ul className="finding-list">
          {data.overall_finding
            .slice(0, showMoreFindings ? data.overall_finding.length : 3)
            .map((finding, index) => (
              <li key={index}>{finding}</li>
            ))}
        </ul>
        {data.overall_finding.length > 3 && (
          <button
            className="toggle-btn"
            onClick={() => setShowMoreFindings((prev) => !prev)}
          >
            {showMoreFindings ? "Show Less" : "Show More"}
          </button>
        )}
      </div>

      {/* Test Summary */}
      <div className="section">
        <div className="section-header-wrapper">
          <div className="section-title">Test Summary</div>
          <button className="filter-btn" onClick={() => setFilterOpen(true)}>
            <FilterListIcon className="filter-icon" />
            Filter
          </button>
        </div>
        <div className="grid">
          {Object.entries(filteredData).map(([testName, details], idx) => (
            <div
              className={"card test-card " + details[3].toLowerCase()}
              key={idx}
              onClick={() => handleOpen(testName, details)}
            >
              <div className="test-card-header">
                <p className="test-title">{testName}</p>
                <button className="icon-btn">
                  <InfoOutlinedIcon />
                </button>
              </div>
              <p>
                Value: <b>{details[0]}</b> {details[1]}
              </p>
              <p>
                Range: {details[2]} {details[1]}
              </p>
              <span className={`chip ${details[3].toLowerCase()}`}>
                {statusIcon(details[3])}
                {details[3]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Popup for Test Details */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>
          {selectedTest?.testName}
          <button className="dialog-close-btn" onClick={handleClose}>
            <CloseIcon />
          </button>
        </DialogTitle>
        <DialogContent>
          {selectedTest && (
            <>
              <p>
                <b>Value:</b> {selectedTest.testData[0]}{" "}
                {selectedTest.testData[1]}
              </p>
              <p>
                <b>Range:</b> {selectedTest.testData[2]}{" "}
                {selectedTest.testData[1]}
              </p>
              <p>
                <b>Status:</b> {selectedTest.testData[3]}
              </p>
              <p className="recommendation-title">Recommendations:</p>
              <ul>
                {selectedTest.testData[4].map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Filter Dialog */}
      <Dialog open={filterOpen} onClose={() => setFilterOpen(false)} fullWidth>
        <DialogTitle>
          Filter Tests
          <button
            className="dialog-close-btn"
            onClick={() => setFilterOpen(false)}
          >
            <CloseIcon />
          </button>
        </DialogTitle>
        <DialogContent>
          <label className="filter-option">
            <input
              type="checkbox"
              checked={filters.includes("Normal")}
              onChange={() => toggleFilter("Normal")}
            />
            Normal
          </label>
          <label className="filter-option">
            <input
              type="checkbox"
              checked={filters.includes("Low")}
              onChange={() => toggleFilter("Low")}
            />
            Low
          </label>
          <label className="filter-option">
            <input
              type="checkbox"
              checked={filters.includes("High")}
              onChange={() => toggleFilter("High")}
            />
            High
          </label>
        </DialogContent>
        <DialogActions className="dialog-actions-filter">
          <button onClick={clearFilter} className="btn-clear">
            Clear All
          </button>
          <button onClick={applyFilter} className="btn-apply">
            Apply
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MedicalReport;
