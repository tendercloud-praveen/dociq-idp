// import {
//   FileText,
//   Calendar,
//   User,
//   Download,
//   Eye,
//   AlertTriangle,
// } from "lucide-react";

// import StatusBadge from "../common/StatusBadge";
// import ConfidenceBar from "../common/ConfidenceBar";

// export default function RejectedDetails({ file, auditTrail }) {
//   if (!file) {
//     return (
//       <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-20 text-center">
//         <FileText size={70} className="mx-auto text-gray-300" />

//         <h2 className="mt-6 text-xl font-semibold text-slate-700">
//           Select Rejected Document
//         </h2>

//         <p className="text-gray-500 mt-2">
//           Select a rejected file to view its details.
//         </p>
//       </div>
//     );
//   }
//   const previewUrl =
//     file.file_url ||
//     (file.file_path
//       ? `https://drainer-silenced-wake.ngrok-free.dev/${file.file_path.replace(/\\/g, "/")}`
//       : null);
//   return (
//     <div className="grid xl:grid-cols-3 gap-6">
//       {/* Preview */}

//       <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm">
//         <div className="flex justify-between items-center border-b p-5">
//           <div>
//             <h2 className="text-lg font-semibold">Document Preview</h2>

//             <p className="text-sm text-gray-500 mt-1">{file.name}</p>
//           </div>

//           <div className="flex gap-2">
//             <button className="w-10 h-10 rounded-xl border hover:bg-gray-100 flex items-center justify-center">
//               <Eye size={18} />
//             </button>

//             <button className="w-10 h-10 rounded-xl border hover:bg-gray-100 flex items-center justify-center">
//               <Download size={18} />
//             </button>
//           </div>
//         </div>

//         {/* <div className="h-[550px] bg-gray-100 flex items-center justify-center">
//           {file.preview ? (
//             <img
//               src={file.preview}
//               alt=""
//               className="max-h-full object-contain"
//             />
//           ) : (
//             <FileText size={90} className="text-gray-300" />
//           )}
//         </div> */}
//         <div className="h-[600px] bg-gray-100 flex items-center justify-center">
//           {previewUrl ? (
//             file.file_name.toLowerCase().endsWith(".pdf") ? (
//               <iframe src={previewUrl} className="w-full h-full" />
//             ) : (
//               <img src={previewUrl} className="max-h-full object-contain" />
//             )
//           ) : (
//             <FileText size={90} />
//           )}
//         </div>
//       </div>

//       {/* Right Side */}

//       <div className="space-y-6">
//         {/* Info */}

//         <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
//           <h3 className="text-lg font-semibold mb-5">Document Information</h3>

//           <div className="space-y-4">
//             <div className="flex justify-between">
//               <span className="text-gray-500">File</span>
//               <span className="font-medium">{file.file_name}</span>
//             </div>

//             <div className="flex justify-between">
//               <span className="text-gray-500">Type</span>
//               <span>{file.document_type}</span>
//             </div>

//             <div className="flex justify-between">
//               <span className="text-gray-500">Uploaded</span>

//               <span className="flex gap-2 items-center">
//                 <Calendar size={15} />

//                 {new Date(file.created_at).toLocaleString()}
//               </span>
//             </div>

//             <div className="flex justify-between">
//               <span className="text-gray-500">Uploaded By</span>

//               <span className="flex gap-2 items-center">
//                 <User size={15} />
//                 {file.uploaded_by || "Unknown"}
//               </span>
//             </div>

//             <div className="flex justify-between items-center">
//               <span>Status</span>

//               <StatusBadge status={file.status} />
//             </div>
//           </div>
//         </div>

//         {/* Confidence */}

//         <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
//           <h3 className="font-semibold mb-4">AI Confidence</h3>
//           <ConfidenceBar value={file.confidence * 100} />{" "}
//         </div>
//         <div className="bg-white rounded-2xl border shadow-sm p-6">
//           <h3 className="font-semibold text-lg mb-5">Extracted Fields</h3>

//           <div className="space-y-4">
//             {Object.entries(file.extracted_data || {}).map(([key, value]) => (
//               <div key={key}>
//                 <label className="block text-sm text-gray-500 mb-1 capitalize">
//                   {key.replace(/_/g, " ")}
//                 </label>

//                 <div className="bg-gray-50 border rounded-xl px-4 py-3">
//                   {String(value)}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Reject Reason */}

//         <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
//           <div className="flex items-center gap-2 mb-4">
//             <AlertTriangle className="text-red-600" size={20} />

//             <h3 className="font-semibold text-red-700">Rejection Reason</h3>
//           </div>

//           <p className="text-sm leading-7 text-red-700">
//             {file.reason ||
//               "Document verification failed due to missing mandatory information or low OCR confidence. Please upload a clear and valid document."}
//           </p>
//         </div>
//         <div className="bg-white rounded-2xl border shadow-sm p-6">
//           <h3 className="font-semibold text-lg mb-5">Audit Trail</h3>

//           {!auditTrail ? (
//             <p>No Audit Trail Found</p>
//           ) : (
//             <div className="space-y-5">
//               {auditTrail.audit_trail.map((item) => (
//                 <div key={item.step}>
//                   <h4 className="font-semibold">{item.action}</h4>

//                   <p className="text-sm text-gray-500">{item.performed_by}</p>

//                   <p className="text-xs text-gray-400">
//                     {new Date(item.time).toLocaleString()}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import {
  Calendar,
  FileText,
  User,
  Download,
  Eye,
  Activity,
  Database,
  Info,
  AlertTriangle,
} from "lucide-react";

import StatusBadge from "../common/StatusBadge";
import ConfidenceBar from "../common/ConfidenceBar";

export default function RejectedDetails({ file, auditTrail }) {
  const [activeTab, setActiveTab] = useState("fields"); // 'fields' | 'info' | 'audit'

  if (!file) {
    return (
      <div className="bg-white rounded-3xl border border-slate-100 p-20 text-center shadow-sm max-w-2xl mx-auto my-12">
        <div className="h-16 w-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <FileText size={32} />
        </div>
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">
          Select Rejected Document
        </h2>
        <p className="text-slate-500 mt-2 text-sm max-w-xs mx-auto">
          Click the preview action on any rejected file to view its error
          history, details, and extracted fields.
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

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
      {/* LEFT COLUMN: INTERACTIVE DOCUMENT PREVIEW PANEL (7 cols) */}
      <div className="xl:col-span-7 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden h-[780px] flex flex-col">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-100 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
              Rejected Document
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
        {/* UPPER SUMMARY CARD (AI Confidence & Rejection Banner) */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                Processing Confidence
              </p>
              <h3 className="text-2xl font-black text-slate-800 mt-1">
                {Math.round(file.confidence)}%{" "}
                <span className="text-xs font-semibold text-slate-400">
                  Match
                </span>
              </h3>
            </div>
            <StatusBadge status={file.status} />
          </div>
          <ConfidenceBar value={file.confidence} />

          {/* Inline Rejection Notice */}
          <div className="bg-rose-50/70 border border-rose-100 rounded-2xl p-4 flex gap-3">
            <AlertTriangle
              className="text-rose-600 shrink-0 mt-0.5"
              size={18}
            />
            <div>
              <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wider">
                Rejection Reason
              </h4>
              <p className="text-xs text-rose-700/90 mt-1 font-medium leading-relaxed">
                {file.reason ||
                  "Document verification failed due to missing mandatory information or low OCR confidence. Please upload a clear and valid document."}
              </p>
            </div>
          </div>
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
            {/* TAB 1: EXTRACTED AI DATA FIELDS */}
            {activeTab === "fields" && (
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
                    Key-Value Extractions
                  </h4>
                  <span className="text-[11px] bg-blue-50 text-blue-600 font-bold px-2.5 py-1 rounded-md">
                    {Object.keys(file.extracted_data || {}).length} Fields
                    Captured
                  </span>
                </div>

                {!file.extracted_data ||
                Object.keys(file.extracted_data).length === 0 ? (
                  <div className="text-center py-12 text-slate-400">
                    <Database
                      className="mx-auto text-slate-200 mb-3"
                      size={36}
                    />
                    <p className="text-xs font-semibold">
                      No fields extracted by artificial model.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {Object.entries(file.extracted_data).map(([key, value]) => (
                      <div
                        key={key}
                        className="group space-y-1 bg-slate-50/50 hover:bg-slate-50 p-3 rounded-xl border border-slate-100/80 transition"
                      >
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider capitalize">
                          {key.replace(/_/g, " ")}
                        </label>
                        <div className="text-sm font-semibold text-slate-800 break-words">
                          {String(value) || (
                            <span className="text-slate-300 italic font-normal">
                              empty value
                            </span>
                          )}
                        </div>
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
                                  ? "border-emerald-500 ring-4 ring-emerald-50/80"
                                  : "border-blue-500 ring-4 ring-blue-50/80"
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
                      {file.source || "Web Portal"}
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
                      {file.uploaded_by || "Administrator"}
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
