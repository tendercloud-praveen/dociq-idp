// import { useState, useEffect } from "react";
// import {
//   Calendar,
//   FileText,
//   User,
//   Download,
//   Eye,
//   Activity,
//   Database,
//   Info,
//   CheckCircle,
//   XCircle,
//   Save,
// } from "lucide-react";

// import StatusBadge from "../common/StatusBadge";
// import ConfidenceBar from "../common/ConfidenceBar";

// export default function ReviewForm({
//   file,
//   auditTrail,
//   onApprove,
//   onReject,
//   onSave,
// }) {
//   const [activeTab, setActiveTab] = useState("fields"); // 'fields' | 'info' | 'audit'
//   const [editedFields, setEditedFields] = useState({});

//   // Sync state if a different document gets loaded into view
//   useEffect(() => {
//     if (file && file.extracted_data) {
//       setEditedFields({ ...file.extracted_data });
//     } else {
//       setEditedFields({});
//     }
//   }, [file]);

//   if (!file) {
//     return (
//       <div className="bg-white rounded-3xl border border-slate-100 p-20 text-center shadow-sm max-w-2xl mx-auto my-12">
//         <div className="h-16 w-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
//           <FileText size={32} />
//         </div>
//         <h2 className="text-xl font-bold text-slate-800 tracking-tight">
//           Select Document for Verification
//         </h2>
//         <p className="text-slate-500 mt-2 text-sm max-w-xs mx-auto">
//           Click the preview action item from the active pending validation queue
//           table below to review AI extraction details.
//         </p>
//       </div>
//     );
//   }

//   const previewUrl =
//     file.file_url ||
//     (file.file_path
//       ? `https://drainer-silenced-wake.ngrok-free.dev/${file.file_path.replace(
//           /\\/g,
//           "/",
//         )}`
//       : null);

//   const handleFieldChange = (key, val) => {
//     setEditedFields((prev) => ({
//       ...prev,
//       [key]: val,
//     }));
//   };

//   const handleSaveChanges = () => {
//     if (onSave) {
//       onSave({
//         ...file,
//         extracted_data: editedFields,
//       });
//     }
//   };

//   return (
//     <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
//       {/* LEFT COLUMN: INTERACTIVE DOCUMENT PREVIEW PANEL (7 cols) */}
//       <div className="xl:col-span-7 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden h-[780px] flex flex-col">
//         <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
//           <div>
//             <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100 mb-2">
//               <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
//               Awaiting Verification Review
//             </span>
//             <h2 className="text-lg font-bold text-slate-800 tracking-tight leading-none">
//               {file.file_name}
//             </h2>
//           </div>

//           <div className="flex gap-2.5">
//             <button className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/20 transition cursor-pointer">
//               <Eye size={18} />
//             </button>
//             <button className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/20 transition cursor-pointer">
//               <Download size={18} />
//             </button>
//           </div>
//         </div>

//         {/* Embedded Document Viewport */}
//         <div className="flex-1 bg-slate-100/60 relative flex items-center justify-center">
//           {previewUrl ? (
//             file.file_name.toLowerCase().endsWith(".pdf") ? (
//               <iframe
//                 src={previewUrl}
//                 title="preview"
//                 className="w-full h-full border-none"
//               />
//             ) : (
//               <img
//                 src={previewUrl}
//                 alt={file.file_name}
//                 className="max-h-full max-w-full object-contain p-4"
//               />
//             )
//           ) : (
//             <div className="text-center space-y-3">
//               <FileText size={80} className="text-slate-300 mx-auto" />
//               <p className="text-sm text-slate-400 font-medium">
//                 No preview available for this document
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* RIGHT COLUMN: AI INTELLIGENCE WORKSPACE (5 cols) */}
//       <div className="xl:col-span-5 flex flex-col space-y-6 h-[780px]">
//         {/* UPPER SUMMARY CARD (AI Confidence + Human Decision Buttons) */}
//         <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-5">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
//                 Processing Confidence
//               </p>
//               <h3 className="text-2xl font-black text-slate-800 mt-1">
//                 {Math.round(file.confidence * 100)}%{" "}
//                 <span className="text-xs font-semibold text-slate-400">
//                   Match
//                 </span>
//               </h3>
//             </div>
//             <StatusBadge status={file.status} />
//           </div>

//           <ConfidenceBar value={file.confidence * 100} />

//           {/* Action Queue Resolution Buttons */}
//           <div className="grid grid-cols-2 gap-3 pt-1">
//             <button
//               onClick={() => onReject && onReject(file.id)}
//               className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-rose-700 text-sm font-bold transition cursor-pointer"
//             >
//               <XCircle size={16} />
//               Reject File
//             </button>
//             <button
//               onClick={() => onApprove && onApprove(file.id)}
//               className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-md shadow-emerald-600/10 transition cursor-pointer"
//             >
//               <CheckCircle size={16} />
//               Approve File
//             </button>
//           </div>
//         </div>

//         {/* TAB WORKSPACE MODULE */}
//         <div className="flex-1 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
//           {/* Tab Selection Row */}
//           <div className="flex border-b border-slate-100 bg-slate-50/50 p-2 gap-1">
//             <button
//               onClick={() => setActiveTab("fields")}
//               className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition cursor-pointer ${
//                 activeTab === "fields"
//                   ? "bg-white text-blue-600 shadow-sm border border-slate-100"
//                   : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"
//               }`}
//             >
//               <Database size={14} />
//               Fields
//             </button>
//             <button
//               onClick={() => setActiveTab("audit")}
//               className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition cursor-pointer ${
//                 activeTab === "audit"
//                   ? "bg-white text-blue-600 shadow-sm border border-slate-100"
//                   : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"
//               }`}
//             >
//               <Activity size={14} />
//               Timeline
//             </button>
//             <button
//               onClick={() => setActiveTab("info")}
//               className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition cursor-pointer ${
//                 activeTab === "info"
//                   ? "bg-white text-blue-600 shadow-sm border border-slate-100"
//                   : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"
//               }`}
//             >
//               <Info size={14} />
//               Details
//             </button>
//           </div>

//           {/* Dynamic Tab Content Box */}
//           <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-200">
//             {/* TAB 1: EXTRACTED EDITABLE AI DATA FIELDS */}
//             {activeTab === "fields" && (
//               <div className="space-y-5 h-full flex flex-col">
//                 <div className="flex justify-between items-center">
//                   <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
//                     Adjust Extraction Layout
//                   </h4>
//                   <button
//                     onClick={handleSaveChanges}
//                     className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-bold transition cursor-pointer"
//                   >
//                     <img />
//                     <Save size={13} />
//                     Save Modifies
//                   </button>
//                 </div>

//                 {!file.extracted_data ||
//                 Object.keys(file.extracted_data).length === 0 ? (
//                   <div className="text-center py-12 text-slate-400 flex-1 flex flex-col justify-center">
//                     <Database
//                       className="mx-auto text-slate-200 mb-3"
//                       size={36}
//                     />
//                     <p className="text-xs font-semibold">
//                       No fields extracted by artificial model.
//                     </p>
//                   </div>
//                 ) : (
//                   <div className="space-y-4 flex-1">
//                     {Object.entries(editedFields).map(([key, value]) => (
//                       <div key={key} className="space-y-1.5">
//                         <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider capitalize">
//                           {key.replace(/_/g, " ")}
//                         </label>
//                         <input
//                           type="text"
//                           value={String(value)}
//                           onChange={(e) =>
//                             handleFieldChange(key, e.target.value)
//                           }
//                           className="w-full bg-slate-50 text-sm font-semibold text-slate-800 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50/60 transition"
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* TAB 2: RICH VERTICAL TIMELINE AUDIT TRAIL */}
//             {activeTab === "audit" && (
//               <div className="space-y-6">
//                 <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
//                   Workflow Processing Trail
//                 </h4>

//                 {!auditTrail ||
//                 !auditTrail.audit_trail ||
//                 auditTrail.audit_trail.length === 0 ? (
//                   <div className="text-center py-12 text-slate-400">
//                     <Activity
//                       className="mx-auto text-slate-200 mb-3"
//                       size={36}
//                     />
//                     <p className="text-xs font-semibold">
//                       No audit timeline logging discovered.
//                     </p>
//                   </div>
//                 ) : (
//                   <div className="relative pl-6 space-y-6 after:absolute after:top-2 after:bottom-2 after:left-2 after:w-0.5 after:bg-slate-100">
//                     {auditTrail.audit_trail.map((item, index) => {
//                       const isLast =
//                         index === auditTrail.audit_trail.length - 1;
//                       const isErrorState =
//                         item.action.toLowerCase().includes("reject") ||
//                         item.action.toLowerCase().includes("fail");

//                       return (
//                         <div
//                           key={item.step || index}
//                           className="relative group"
//                         >
//                           {/* Indicator Timeline Dot */}
//                           <div
//                             className={`absolute -left-[23px] top-1 h-3.5 w-3.5 rounded-full border-2 bg-white z-10 transition-all group-hover:scale-125 ${
//                               isErrorState
//                                 ? "border-rose-500 ring-4 ring-rose-50/80"
//                                 : isLast
//                                   ? "border-blue-500 ring-4 ring-blue-50/80 animate-pulse"
//                                   : "border-slate-400 ring-4 ring-slate-50"
//                             }`}
//                           />

//                           {/* Detail Content Card */}
//                           <div className="space-y-1 bg-white rounded-xl border border-slate-100 hover:border-slate-200/80 p-3.5 shadow-sm transition">
//                             <div className="flex justify-between items-start gap-2">
//                               <p
//                                 className={`text-xs font-bold tracking-tight ${isErrorState ? "text-rose-600" : "text-slate-800"}`}
//                               >
//                                 {item.action}
//                               </p>
//                               <span className="text-[10px] text-slate-400 font-semibold whitespace-nowrap">
//                                 {new Date(item.time).toLocaleTimeString([], {
//                                   hour: "2-digit",
//                                   minute: "2-digit",
//                                 })}
//                               </span>
//                             </div>

//                             <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
//                               <User size={10} className="text-slate-400" />
//                               <span>
//                                 By {item.performed_by || "System Process"}
//                               </span>
//                             </div>

//                             <p className="text-[10px] text-slate-400 font-medium">
//                               {new Date(item.time).toLocaleDateString(
//                                 undefined,
//                                 {
//                                   month: "short",
//                                   day: "numeric",
//                                   year: "numeric",
//                                 },
//                               )}
//                             </p>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* TAB 3: DOCUMENT METADATA */}
//             {activeTab === "info" && (
//               <div className="space-y-5">
//                 <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
//                   File Metadata
//                 </h4>

//                 <div className="divide-y divide-slate-100 bg-slate-50/50 rounded-2xl border border-slate-100 overflow-hidden text-xs">
//                   <div className="flex justify-between p-4 bg-white">
//                     <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
//                       Document Name
//                     </span>
//                     <span className="font-semibold text-slate-700 text-right max-w-xs break-all">
//                       {file.file_name}
//                     </span>
//                   </div>
//                   <div className="flex justify-between p-4 bg-white">
//                     <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
//                       Document Category
//                     </span>
//                     <span className="font-semibold text-slate-700">
//                       {file.document_type || "N/A"}
//                     </span>
//                   </div>
//                   <div className="flex justify-between p-4 bg-white">
//                     <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
//                       Inbound Source
//                     </span>
//                     <span className="font-semibold text-slate-700">
//                       {file.source || "Web Ingestion Portal"}
//                     </span>
//                   </div>
//                   <div className="flex justify-between p-4 bg-white">
//                     <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
//                       Ingested Timestamp
//                     </span>
//                     <span className="font-semibold text-slate-700 flex items-center gap-1.5">
//                       <Calendar size={12} className="text-slate-400" />
//                       {new Date(file.created_at).toLocaleString()}
//                     </span>
//                   </div>
//                   <div className="flex justify-between p-4 bg-white">
//                     <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
//                       Operator / Submitter
//                     </span>
//                     <span className="font-semibold text-slate-700 flex items-center gap-1.5">
//                       <User size={12} className="text-slate-400" />
//                       {file.uploaded_by || "System Automated"}
//                     </span>
//                   </div>
//                   <div className="flex justify-between p-4 bg-white">
//                     <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
//                       Document ID
//                     </span>
//                     <span className="font-mono text-slate-500 break-all select-all">
//                       {file.id || "N/A"}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import {
  Calendar,
  FileText,
  User,
  Download,
  Eye,
  Activity,
  Database,
  Info,
  CheckCircle,
  XCircle,
  Save,
} from "lucide-react";

import StatusBadge from "../common/StatusBadge";
import ConfidenceBar from "../common/ConfidenceBar";

export default function ReviewForm({
  file,
  auditTrail,
  viewMode, // Added to track view vs edit mode context
  onApprove,
  onReject,
  onSave,
}) {
  const [activeTab, setActiveTab] = useState("fields"); // 'fields' | 'info' | 'audit'
  const [editedFields, setEditedFields] = useState({});

  // Sync state if a different document gets loaded into view
  useEffect(() => {
    if (file && file.extracted_data) {
      setEditedFields({ ...file.extracted_data });
    } else {
      setEditedFields({});
    }
  }, [file]);

  if (!file) {
    return (
      <div className="bg-white rounded-3xl border border-slate-100 p-20 text-center shadow-sm max-w-2xl mx-auto my-12">
        <div className="h-16 w-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <FileText size={32} />
        </div>
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">
          Select Document for Verification
        </h2>
        <p className="text-slate-500 mt-2 text-sm max-w-xs mx-auto">
          Click the preview action item from the active pending validation queue
          table below to review AI extraction details.
        </p>
      </div>
    );
  }

  const previewUrl =
    file.file_url ||
    (file.file_path
      ? `https://drainer-silenced-wake.ngrok-free.dev/${file.file_path.replace(
          /\\/g,
          "/",
        )}`
      : null);

  const handleFieldChange = (key, val) => {
    setEditedFields((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleSaveChanges = () => {
    if (onSave) {
      onSave({
        ...file,
        extracted_data: editedFields,
      });
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
      {/* LEFT COLUMN: INTERACTIVE DOCUMENT PREVIEW PANEL (7 cols) */}
      <div className="xl:col-span-7 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden h-[780px] flex flex-col">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
              {viewMode
                ? "Document Inspect Mode"
                : "Awaiting Verification Review"}
            </span>
            <h2 className="text-lg font-bold text-slate-800 tracking-tight leading-none">
              {file.file_name}
            </h2>
          </div>

          <div className="flex gap-2.5">
            <button className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/20 transition cursor-pointer">
              <Eye size={18} />
            </button>
            <button className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/20 transition cursor-pointer">
              <Download size={18} />
            </button>
          </div>
        </div>

        {/* Embedded Document Viewport */}
        <div className="flex-1 bg-slate-100/60 relative flex items-center justify-center">
          {previewUrl ? (
            file.file_name.toLowerCase().endsWith(".pdf") ? (
              <iframe
                src={previewUrl}
                title="preview"
                className="w-full h-full border-none"
              />
            ) : (
              <img
                src={previewUrl}
                alt={file.file_name}
                className="max-h-full max-w-full object-contain p-4"
              />
            )
          ) : (
            <div className="text-center space-y-3">
              <FileText size={80} className="text-slate-300 mx-auto" />
              <p className="text-sm text-slate-400 font-medium">
                No preview available for this document
              </p>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: AI INTELLIGENCE WORKSPACE (5 cols) */}
      <div className="xl:col-span-5 flex flex-col space-y-6 h-[780px]">
        {/* UPPER SUMMARY CARD (AI Confidence + Dynamic Action Buttons) */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                Processing Confidence
              </p>
              <h3 className="text-2xl font-black text-slate-800 mt-1">
                {Math.round(file.confidence * 100)}%{" "}
                <span className="text-xs font-semibold text-slate-400">
                  Match
                </span>
              </h3>
            </div>
            <StatusBadge status={file.status} />
          </div>

          <ConfidenceBar value={file.confidence * 100} />

          {/* Action Queue Resolution Buttons (Hidden completely if in viewMode) */}
          {!viewMode && (
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={() => onReject && onReject(file.id)}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-rose-700 text-sm font-bold transition cursor-pointer"
              >
                <XCircle size={16} />
                Reject File
              </button>
              <button
                onClick={() => onApprove && onApprove(file.id)}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-md shadow-emerald-600/10 transition cursor-pointer"
              >
                <CheckCircle size={16} />
                Approve File
              </button>
            </div>
          )}
        </div>

        {/* TAB WORKSPACE MODULE */}
        <div className="flex-1 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
          {/* Tab Selection Row */}
          <div className="flex border-b border-slate-100 bg-slate-50/50 p-2 gap-1">
            <button
              onClick={() => setActiveTab("fields")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition cursor-pointer ${
                activeTab === "fields"
                  ? "bg-white text-blue-600 shadow-sm border border-slate-100"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"
              }`}
            >
              <Database size={14} />
              Fields
            </button>
            <button
              onClick={() => setActiveTab("audit")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition cursor-pointer ${
                activeTab === "audit"
                  ? "bg-white text-blue-600 shadow-sm border border-slate-100"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"
              }`}
            >
              <Activity size={14} />
              Timeline
            </button>
            <button
              onClick={() => setActiveTab("info")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition cursor-pointer ${
                activeTab === "info"
                  ? "bg-white text-blue-600 shadow-sm border border-slate-100"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"
              }`}
            >
              <Info size={14} />
              Details
            </button>
          </div>

          {/* Dynamic Tab Content Box */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-200">
            {/* TAB 1: EXTRACTED EDITABLE AI DATA FIELDS */}
            {activeTab === "fields" && (
              <div className="space-y-5 h-full flex flex-col">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                    {viewMode
                      ? "Extracted Fields View"
                      : "Adjust Extraction Layout"}
                  </h4>
                  {/* Hide Save button during view mode */}
                  {!viewMode && (
                    <button
                      onClick={handleSaveChanges}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-bold transition cursor-pointer"
                    >
                      <Save size={13} />
                      Save Modifies
                    </button>
                  )}
                </div>

                {!file.extracted_data ||
                Object.keys(file.extracted_data).length === 0 ? (
                  <div className="text-center py-12 text-slate-400 flex-1 flex flex-col justify-center">
                    <Database
                      className="mx-auto text-slate-200 mb-3"
                      size={36}
                    />
                    <p className="text-xs font-semibold">
                      No fields extracted by artificial model.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 flex-1">
                    {Object.entries(editedFields).map(([key, value]) => (
                      <div key={key} className="space-y-1.5">
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider capitalize">
                          {key.replace(/_/g, " ")}
                        </label>
                        <input
                          type="text"
                          value={String(value)}
                          readOnly={viewMode} // Make read-only if viewing
                          onChange={(e) =>
                            handleFieldChange(key, e.target.value)
                          }
                          className={`w-full text-sm font-semibold px-4 py-2.5 rounded-xl border transition focus:outline-none ${
                            viewMode
                              ? "bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed"
                              : "bg-slate-50 text-slate-800 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50/60"
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: RICH VERTICAL TIMELINE AUDIT TRAIL */}
            {activeTab === "audit" && (
              <div className="space-y-6">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                  Workflow Processing Trail
                </h4>

                {!auditTrail ||
                !auditTrail.audit_trail ||
                auditTrail.audit_trail.length === 0 ? (
                  <div className="text-center py-12 text-slate-400">
                    <Activity
                      className="mx-auto text-slate-200 mb-3"
                      size={36}
                    />
                    <p className="text-xs font-semibold">
                      No audit timeline logging discovered.
                    </p>
                  </div>
                ) : (
                  <div className="relative pl-6 space-y-6 after:absolute after:top-2 after:bottom-2 after:left-2 after:w-0.5 after:bg-slate-100">
                    {auditTrail.audit_trail.map((item, index) => {
                      const isLast =
                        index === auditTrail.audit_trail.length - 1;
                      const isErrorState =
                        item.action.toLowerCase().includes("reject") ||
                        item.action.toLowerCase().includes("fail");

                      return (
                        <div
                          key={item.step || index}
                          className="relative group"
                        >
                          {/* Indicator Timeline Dot */}
                          <div
                            className={`absolute -left-[23px] top-1 h-3.5 w-3.5 rounded-full border-2 bg-white z-10 transition-all group-hover:scale-125 ${
                              isErrorState
                                ? "border-rose-500 ring-4 ring-rose-50/80"
                                : isLast
                                  ? "border-blue-500 ring-4 ring-blue-50/80 animate-pulse"
                                  : "border-slate-400 ring-4 ring-slate-50"
                            }`}
                          />

                          {/* Detail Content Card */}
                          <div className="space-y-1 bg-white rounded-xl border border-slate-100 hover:border-slate-200/80 p-3.5 shadow-sm transition">
                            <div className="flex justify-between items-start gap-2">
                              <p
                                className={`text-xs font-bold tracking-tight ${isErrorState ? "text-rose-600" : "text-slate-800"}`}
                              >
                                {item.action}
                              </p>
                              <span className="text-[10px] text-slate-400 font-semibold whitespace-nowrap">
                                {new Date(item.time).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                              <User size={10} className="text-slate-400" />
                              <span>
                                By {item.performed_by || "System Process"}
                              </span>
                            </div>

                            <p className="text-[10px] text-slate-400 font-medium">
                              {new Date(item.time).toLocaleDateString(
                                undefined,
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: DOCUMENT METADATA */}
            {activeTab === "info" && (
              <div className="space-y-5">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                  File Metadata
                </h4>

                <div className="divide-y divide-slate-100 bg-slate-50/50 rounded-2xl border border-slate-100 overflow-hidden text-xs">
                  <div className="flex justify-between p-4 bg-white">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                      Document Name
                    </span>
                    <span className="font-semibold text-slate-700 text-right max-w-xs break-all">
                      {file.file_name}
                    </span>
                  </div>
                  <div className="flex justify-between p-4 bg-white">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                      Document Category
                    </span>
                    <span className="font-semibold text-slate-700">
                      {file.document_type || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between p-4 bg-white">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                      Inbound Source
                    </span>
                    <span className="font-semibold text-slate-700">
                      {file.source || "Web Ingestion Portal"}
                    </span>
                  </div>
                  <div className="flex justify-between p-4 bg-white">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                      Ingested Timestamp
                    </span>
                    <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                      <Calendar size={12} className="text-slate-400" />
                      {new Date(file.created_at).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between p-4 bg-white">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                      Operator / Submitter
                    </span>
                    <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                      <User size={12} className="text-slate-400" />
                      {file.uploaded_by || "System Automated"}
                    </span>
                  </div>
                  <div className="flex justify-between p-4 bg-white">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                      Document ID
                    </span>
                    <span className="font-mono text-slate-500 break-all select-all">
                      {file.id || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
