// import { useState } from "react";
// import axios from "axios";

// const Upload = () => {
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);

//   const handleFileChange = (e) => {
//     setFiles(Array.from(e.target.files));
//   };

//   const handleSubmit = async () => {
//     if (files.length === 0) {
//       alert("Please select one or more files.");
//       return;
//     }

//     const formData = new FormData();

//     files.forEach((file) => {
//       formData.append("files", file);
//     });

//     try {
//       setLoading(true);

//       // const response = await axios.post(
//       //   "http://127.0.0.1:8000/documents/upload",
//       //   formData,
//       //   {
//       //     headers: {
//       //       "Content-Type": "multipart/form-data",
//       //     },
//       //   }
//       // );

//       const response = await axios.post(
//         `${import.meta.env.VITE_API_URL}/documents/upload`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         },
//       );

//       console.log(response.data);
//       setResult(response.data);

//       alert("Documents uploaded successfully!");
//     } catch (error) {
//       console.error(error);

//       if (error.response) {
//         alert(error.response.data.detail || "Upload failed");
//       } else {
//         alert("Cannot connect to backend.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="upload-container">
//       <h2>Upload Documents</h2>

//       <input type="file" multiple onChange={handleFileChange} />

//       <br />
//       <br />

//       {files.length > 0 && (
//         <>
//           <h3>Selected Files</h3>

//           <ul>
//             {files.map((file, index) => (
//               <li key={index}>{file.name}</li>
//             ))}
//           </ul>
//         </>
//       )}

//       <button onClick={handleSubmit} disabled={loading}>
//         {loading ? "Uploading..." : "Submit"}
//       </button>

//       {result && (
//         <div style={{ marginTop: "30px" }}>
//           <h3>Backend Response</h3>

//           <pre>{JSON.stringify(result, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Upload;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { uploadDocuments } from "../services/documentService";

const Upload = () => {
  // --- STATE MANAGEMENT ---
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);

  // API Data States
  const [tableData, setTableData] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
  });
  const [breakdown, setBreakdown] = useState({
    invoices: 0,
    resumes: 0,
    panCards: 0,
    unknown: 0,
  });
  const [dataLoading, setDataLoading] = useState(true);

  // Get base URL from environment variables
  // const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  // --- FETCH DASHBOARD DATA FROM API ---
  const fetchDashboardData = async () => {
    try {
      setDataLoading(true);

      // Fetching all dashboard details in parallel
      const [filesRes, statsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/documents`),
        axios.get(`${API_BASE_URL}/documents/stats`),
      ]);

      // Set table data from backend response
      setTableData(filesRes.data.files || filesRes.data);

      // Set counter cards and breakdown from backend response
      if (statsRes.data) {
        setStats(statsRes.data.summary);
        setBreakdown(statsRes.data.breakdown);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setDataLoading(false);
    }
  };

  // Run on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // --- FILE UPLOAD HANDLERS ---
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleSubmit = async () => {
    if (files.length === 0) {
      alert("Please select one or more files.");
      return;
    }

    try {
      setLoading(true);

      const data = await uploadDocuments(files);

      setResult(data);
      alert("Documents uploaded successfully!");

      fetchDashboardData();
      setFiles([]);
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.detail || "Upload failed");
      } else {
        alert("Cannot connect to backend.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Helper percentages calculations
  const approvedPct =
    stats.total > 0
      ? ((stats.approved / stats.total) * 100).toFixed(2)
      : "0.00";
  const rejectedPct =
    stats.total > 0
      ? ((stats.rejected / stats.total) * 100).toFixed(2)
      : "0.00";
  const pendingPct =
    stats.total > 0 ? ((stats.pending / stats.total) * 100).toFixed(2) : "0.00";

  return (
    <div className="flex min-h-screen bg-[#f4f7fc] text-[#1e293b] font-sans">
      {/* SIDEBAR */}
      <aside className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-6 justify-between shrink-0">
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <div className="p-3 bg-[#2563eb] text-white rounded-xl shadow-md cursor-pointer">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6l-5-5H9z" />
              <path d="M5 6a3 3 0 00-3 3v8a3 3 0 003 3h6a3 3 0 003-3v-1H5V6z" />
            </svg>
          </div>
          <div className="p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 rounded-lg cursor-pointer">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <div className="p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 rounded-lg cursor-pointer">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        </div>
        <div className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg cursor-pointer">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* HEADER */}
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#0f172a]">
              Document AI
            </h1>
            <p className="text-sm text-gray-500 font-medium">
              Intelligent Document Processing System
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-500 p-2 hover:bg-gray-200/60 rounded-full">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </button>
            <button className="text-gray-500 p-2 hover:bg-gray-200/60 rounded-full relative">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#3b82f6] text-white flex items-center justify-center font-bold text-sm cursor-pointer shadow">
              A
            </div>
          </div>
        </header>

        {/* MIDDLE SECTION COMPOSITE GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-6">
          {/* LEFT COLUMN: UPLOAD CONSOLE */}
          <div className="xl:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 text-[#0f172a] font-bold text-sm">
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                Upload Documents
              </div>

              {/* Drag and Drop Zone */}
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-colors relative group ${
                  isDragActive
                    ? "border-blue-500 bg-blue-50/50"
                    : "border-gray-200 bg-gray-50/50 hover:bg-gray-50"
                }`}
              >
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="p-3 bg-blue-50 text-blue-600 rounded-full mb-3 group-hover:scale-105 transition-transform">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-gray-700">
                  Drag & Drop Files Here
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  or click below to browse
                </p>

                <button
                  type="button"
                  className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold shadow hover:bg-blue-700 transition"
                >
                  Choose Files
                </button>
                <p className="text-[10px] text-gray-400 mt-3">
                  JPG, PNG, PDF (Max 10MB)
                </p>
              </div>

              {/* Show Selected Files List */}
              {files.length > 0 && (
                <div className="mt-4 max-h-24 overflow-y-auto border border-gray-100 rounded-lg p-2 bg-gray-50">
                  <p className="text-xs font-bold text-gray-500 mb-1">
                    Selected ({files.length}):
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {files.map((file, i) => (
                      <li key={i} className="truncate">
                        📄 {file.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full mt-5 py-3 bg-[#1e6091] hover:bg-[#1a5276] disabled:bg-gray-300 text-white font-semibold rounded-xl text-sm transition shadow-sm"
            >
              {loading ? "Uploading..." : "Upload Documents"}
            </button>
          </div>

          {/* RIGHT COLUMN: ANALYTICS CARDS & METRICS */}
          <div className="xl:col-span-8 flex flex-col justify-between gap-6">
            {/* Status Grid Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total Files */}
              <div className="bg-[#f0f5ff] p-5 rounded-2xl border border-blue-100/50 flex flex-col items-center text-center">
                <div className="p-2.5 bg-white text-blue-600 rounded-full shadow-sm mb-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div className="text-[11px] font-bold text-blue-500 tracking-wide uppercase">
                  Total Files
                </div>
                <div className="text-3xl font-extrabold text-[#0f172a] mt-1">
                  {stats.total}
                </div>
                <div className="text-[10px] text-gray-400 font-medium mt-1">
                  All uploaded files
                </div>
              </div>

              {/* Approved */}
              <div className="bg-[#f0fdf4] p-5 rounded-2xl border border-green-100 flex flex-col items-center text-center">
                <div className="p-2.5 bg-white text-green-600 rounded-full shadow-sm mb-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="text-[11px] font-bold text-green-600 tracking-wide uppercase">
                  Approved
                </div>
                <div className="text-3xl font-extrabold text-[#0f172a] mt-1">
                  {stats.approved}
                </div>
                <div className="text-[11px] font-bold text-green-600 mt-0.5">
                  {approvedPct}%
                </div>
                <button className="text-[10px] font-bold text-green-600 mt-2 flex items-center gap-1 hover:underline">
                  View Approved Files →
                </button>
              </div>

              {/* Rejected */}
              <div className="bg-[#fef2f2] p-5 rounded-2xl border border-red-100 flex flex-col items-center text-center">
                <div className="p-2.5 bg-white text-red-500 rounded-full shadow-sm mb-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="text-[11px] font-bold text-red-500 tracking-wide uppercase">
                  Rejected
                </div>
                <div className="text-3xl font-extrabold text-[#0f172a] mt-1">
                  {stats.rejected}
                </div>
                <div className="text-[11px] font-bold text-red-500 mt-0.5">
                  {rejectedPct}%
                </div>
                <button className="text-[10px] font-bold text-red-500 mt-2 flex items-center gap-1 hover:underline">
                  View Rejected Files →
                </button>
              </div>

              {/* Pending */}
              <div className="bg-[#fffbeb] p-5 rounded-2xl border border-amber-100 flex flex-col items-center text-center">
                <div className="p-2.5 bg-white text-amber-500 rounded-full shadow-sm mb-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="text-[11px] font-bold text-amber-500 tracking-wide uppercase">
                  Pending
                </div>
                <div className="text-3xl font-extrabold text-[#0f172a] mt-1">
                  {stats.pending}
                </div>
                <div className="text-[11px] font-bold text-amber-500 mt-0.5">
                  {pendingPct}%
                </div>
                <button className="text-[10px] font-bold text-amber-500 mt-2 flex items-center gap-1 hover:underline">
                  View Pending Files →
                </button>
              </div>
            </div>

            {/* Document Type Breakdown Section */}
            <div>
              <div className="text-xs font-bold text-gray-700 mb-2">
                Document Type Breakdown ({stats.total})
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white p-3 border border-gray-100 rounded-xl flex justify-between items-center shadow-sm">
                  <div className="flex items-center gap-2 truncate">
                    <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M4 4a2 2 0 012-2h4.586A1 1 0 0111 2.414l4.172 4.172a1 1 0 01.293.707V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                      </svg>
                    </div>
                    <div className="text-xs font-bold text-blue-700 truncate">
                      Invoices
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-1">
                    <span className="text-sm font-bold block">
                      {breakdown.invoices || 0}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {stats.total > 0
                        ? ((breakdown.invoices / stats.total) * 100).toFixed(2)
                        : "0.00"}
                      %
                    </span>
                  </div>
                </div>

                <div className="bg-white p-3 border border-gray-100 rounded-xl flex justify-between items-center shadow-sm">
                  <div className="flex items-center gap-2 truncate">
                    <div className="p-1.5 bg-purple-50 text-purple-600 rounded-lg">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6l-5-5H9z" />
                      </svg>
                    </div>
                    <div className="text-xs font-bold text-purple-700 truncate">
                      Resumes
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-1">
                    <span className="text-sm font-bold block">
                      {breakdown.resumes || 0}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {stats.total > 0
                        ? ((breakdown.resumes / stats.total) * 100).toFixed(2)
                        : "0.00"}
                      %
                    </span>
                  </div>
                </div>

                <div className="bg-white p-3 border border-gray-100 rounded-xl flex justify-between items-center shadow-sm">
                  <div className="flex items-center gap-2 truncate">
                    <div className="p-1.5 bg-amber-50 text-amber-600 rounded-lg">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3v3H4V4zm0 5h3v3H4V9zm0 5h3v3H4v-3zm11-5h3v3h-3V9zm0 5h3v3h-3v-3zM8 8h4v4H8V8zm0 6h4v4H8v-4zm5-10h3v3h-3V4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="text-xs font-bold text-amber-700 truncate">
                      PAN Cards
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-1">
                    <span className="text-sm font-bold block">
                      {breakdown.panCards || 0}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {stats.total > 0
                        ? ((breakdown.panCards / stats.total) * 100).toFixed(2)
                        : "0.00"}
                      %
                    </span>
                  </div>
                </div>

                <div className="bg-white p-3 border border-gray-100 rounded-xl flex justify-between items-center shadow-sm">
                  <div className="flex items-center gap-2 truncate">
                    <div className="p-1.5 bg-slate-50 text-slate-600 rounded-lg">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0118 0zm-8-3a1 1 0 00-.832.445l-2 3a1 1 0 101.664 1.11L10 9.555l1.168 1.75a1 1 0 001.664-1.11l-2-3A1 1 0 0010 7z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="text-xs font-bold text-slate-700 truncate">
                      Unknown
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-1">
                    <span className="text-sm font-bold block">
                      {breakdown.unknown || 0}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {stats.total > 0
                        ? ((breakdown.unknown / stats.total) * 100).toFixed(2)
                        : "0.00"}
                      %
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* File Status Progress Banner */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <div className="text-xs font-bold text-gray-700 mb-2">
                File Status Overview
              </div>
              <div className="w-full h-3 rounded-full flex overflow-hidden bg-gray-100 mb-3">
                <div
                  style={{ width: `${approvedPct}%` }}
                  className="bg-green-500 h-full animate-pulse-once"
                />
                <div
                  style={{ width: `${rejectedPct}%` }}
                  className="bg-red-500 h-full"
                />
                <div
                  style={{ width: `${pendingPct}%` }}
                  className="bg-amber-500 h-full"
                />
              </div>
              <div className="flex flex-wrap items-center gap-4 text-[11px] font-semibold text-gray-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full" />{" "}
                  Approved ({stats.approved})
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-red-500 rounded-full" />{" "}
                  Rejected ({stats.rejected})
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-amber-500 rounded-full" />{" "}
                  Pending ({stats.pending})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BACKEND RESPONSE CONSOLE LOG */}
        {result && (
          <div className="mb-6 p-4 bg-gray-900 border border-gray-800 text-green-400 rounded-xl shadow-inner font-mono text-xs">
            <div className="text-gray-400 font-bold mb-1 pb-1 border-b border-gray-800 flex justify-between">
              <span>Backend Server Response Logs</span>
              <span className="text-[10px] bg-green-900/40 px-1.5 py-0.5 rounded text-green-300">
                SUCCESS
              </span>
            </div>
            <pre className="overflow-x-auto p-1 max-h-32">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        {/* BOTTOM: UPLOADED FILES DATA TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Table Toolbar */}
          <div className="p-4 border-b border-gray-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
            <h2 className="text-sm font-bold text-gray-800 self-start sm:self-center">
              Uploaded Files ({stats.total})
            </h2>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-60">
                <input
                  type="text"
                  placeholder="Search files..."
                  className="w-full pl-8 pr-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-blue-500"
                />
                <svg
                  className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <select className="border border-gray-200 bg-white px-3 py-1.5 rounded-lg text-xs focus:outline-none text-gray-600 font-medium">
                <option>Filter: All</option>
                <option>Approved</option>
                <option>Pending</option>
                <option>Rejected</option>
              </select>
            </div>
          </div>

          {/* Table View / Loader Switch */}
          {dataLoading ? (
            <div className="p-12 text-center text-xs text-gray-400 font-semibold tracking-wide">
              Loading pipeline components...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 font-bold">
                    <th className="p-3 w-12 text-center">#</th>
                    <th className="p-3">File Name</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Uploaded On</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Confidence</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 font-medium text-gray-700">
                  {tableData.map((row, index) => (
                    <tr
                      key={row.id || index}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="p-3 text-center text-gray-400">
                        {index + 1}
                      </td>
                      <td className="p-3 font-semibold flex items-center gap-2 max-w-xs truncate">
                        <span className="text-red-500 shrink-0 text-base">
                          📕
                        </span>
                        <span className="truncate">
                          {row.name || row.filename}
                        </span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                            row.type === "Invoice"
                              ? "bg-blue-50 text-blue-600"
                              : row.type === "Resume"
                                ? "bg-purple-50 text-purple-600"
                                : row.type === "PAN"
                                  ? "bg-amber-50 text-amber-600"
                                  : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {row.type || "Unknown"}
                        </span>
                      </td>
                      <td className="p-3 text-gray-400 text-[11px]">
                        {row.uploadedAt || row.created_at}
                      </td>
                      <td className="p-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-bold ${
                            row.status === "Approved"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : row.status === "Pending"
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : "bg-red-50 text-red-700 border-red-200"
                          }`}
                        >
                          <span
                            className={`w-1 h-1 rounded-full ${
                              row.status === "Approved"
                                ? "bg-green-600"
                                : row.status === "Pending"
                                  ? "bg-amber-500"
                                  : "bg-red-600"
                            }`}
                          />
                          {row.status || "Pending"}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2 w-28">
                          <span className="w-8 shrink-0 text-[11px] font-bold text-gray-600">
                            {row.confidence || 0}%
                          </span>
                          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              style={{ width: `${row.confidence || 0}%` }}
                              className={`h-full rounded-full ${
                                row.status === "Approved"
                                  ? "bg-green-500"
                                  : row.status === "Pending"
                                    ? "bg-amber-500"
                                    : "bg-red-500"
                              }`}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center justify-center gap-2 text-gray-400">
                          <button className="p-1 hover:text-blue-600 hover:bg-blue-50 rounded transition">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </button>
                          <button className="p-1 hover:text-blue-600 hover:bg-blue-50 rounded transition">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {tableData.length === 0 && (
                    <tr>
                      <td
                        colSpan="7"
                        className="p-8 text-center text-gray-400 font-medium"
                      >
                        No documents processed yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Table Footer / Pagination */}
          <div className="p-4 bg-white border-t border-gray-100 flex flex-col sm:flex-row gap-3 items-center justify-between text-xs text-gray-400 font-semibold">
            <div>
              Showing 1 to {tableData.length} of {stats.total} entries
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <button className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50">
                  ‹
                </button>
                <button className="w-6 h-6 flex items-center justify-center rounded bg-[#2563eb] text-white shadow-sm">
                  1
                </button>
                <button className="w-6 h-6 flex items-center justify-center rounded border border-transparent text-gray-600">
                  2
                </button>
                <span className="px-1">...</span>
                <button className="w-6 h-6 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50">
                  ›
                </button>
              </div>
              <div className="flex items-center gap-1.5 text-gray-500">
                <span>Rows per page:</span>
                <select className="border border-gray-200 bg-white p-1 rounded font-medium text-gray-600 focus:outline-none">
                  <option>5</option>
                  <option>10</option>
                  <option>25</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
