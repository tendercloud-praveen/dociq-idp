// import { UploadCloud, FileText } from "lucide-react";

// export default function UploadCard({
//   files,
//   loading,
//   isDragActive,
//   handleDrag,
//   handleDrop,
//   handleFileChange,
//   handleSubmit,
// }) {
//   return (
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-full flex flex-col justify-between">
//       <div>
//         <div className="flex items-center gap-2 mb-5">
//           <UploadCloud className="w-5 h-5 text-blue-600" />
//           <h2 className="font-semibold text-slate-800">Upload Documents</h2>
//         </div>

//         <div
//           onDragEnter={handleDrag}
//           onDragOver={handleDrag}
//           onDragLeave={handleDrag}
//           onDrop={handleDrop}
//           className={`relative border-2 border-dashed rounded-xl transition-all duration-300
//           ${
//             isDragActive
//               ? "border-blue-500 bg-blue-50"
//               : "border-gray-300 bg-gray-50 hover:border-blue-400"
//           }`}
//         >
//           <input
//             type="file"
//             multiple
//             onChange={handleFileChange}
//             className="absolute inset-0 opacity-0 cursor-pointer"
//           />

//           <div className="flex flex-col items-center justify-center py-12 px-6">
//             <div className="bg-blue-100 p-4 rounded-full mb-4">
//               <UploadCloud className="w-8 h-8 text-blue-600" />
//             </div>

//             <h3 className="font-semibold text-slate-700">Drag & Drop Files</h3>

//             <p className="text-gray-500 text-sm mt-2 text-center">
//               Upload PDF, JPG, PNG or DOC files
//             </p>

//             <button
//               type="button"
//               className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium"
//             >
//               Browse Files
//             </button>

//             <p className="text-xs text-gray-400 mt-3">
//               Maximum file size 10 MB
//             </p>
//           </div>
//         </div>

//         {files.length > 0 && (
//           <div className="mt-5">
//             <h4 className="text-sm font-semibold mb-3">Selected Files</h4>

//             <div className="space-y-2 max-h-40 overflow-auto">
//               {files.map((file, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2 border"
//                 >
//                   <FileText className="text-blue-600 w-5 h-5" />

//                   <div className="flex-1 overflow-hidden">
//                     <p className="truncate text-sm font-medium">{file.name}</p>

//                     <p className="text-xs text-gray-400">
//                       {(file.size / 1024 / 1024).toFixed(2)} MB
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       <button
//         onClick={handleSubmit}
//         disabled={loading}
//         className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-xl py-3 font-semibold transition"
//       >
//         {loading ? "Uploading..." : "Upload Documents"}
//       </button>
//     </div>
//   );
// }

import { UploadCloud, FileText } from "lucide-react";

export default function UploadCard({
  files,
  loading,
  isDragActive,
  handleDrag,
  handleDrop,
  handleFileChange,
  handleSubmit,
}) {
  return (
    <div className="bg-white rounded-xl p-4 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-3.5">
          <UploadCloud className="w-4 h-4 text-blue-600" />
          <h2 className="font-bold text-xs text-slate-800 uppercase tracking-wider">
            Upload Documents
          </h2>
        </div>

        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl transition-all duration-200
          ${
            isDragActive
              ? "border-blue-500 bg-blue-50/50"
              : "border-slate-200 bg-slate-50/50 hover:border-blue-400"
          }`}
        >
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
          />

          <div className="flex flex-col items-center justify-center py-6 px-4 text-center">
            <div className="bg-blue-100/70 p-2.5 rounded-full mb-2">
              <UploadCloud className="w-5 h-5 text-blue-600" />
            </div>

            <h3 className="font-bold text-xs text-slate-700">
              Drag & Drop Files Here
            </h3>
            <p className="text-slate-400 text-[10px] mt-0.5 font-medium">
              or click below to browse
            </p>

            <button
              type="button"
              className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm pointer-events-none"
            >
              Choose Files
            </button>

            <p className="text-[9px] text-slate-400 font-semibold mt-2.5">
              JPG, PNG, PDF (Max 10MB)
            </p>
          </div>
        </div>

        {files.length > 0 && (
          <div className="mt-4">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Selected ({files.length})
            </h4>
            <div className="space-y-1.5 max-h-[110px] overflow-y-auto pr-1">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-slate-50 rounded-lg p-2 border border-slate-100"
                >
                  <FileText className="text-blue-500 w-3.5 h-3.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-xs font-semibold text-slate-700">
                      {file.name}
                    </p>
                    <p className="text-[9px] text-slate-400 font-medium">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading || files.length === 0}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-100 disabled:text-slate-400 text-white rounded-xl py-2 text-xs font-bold transition shadow-sm"
      >
        {loading ? "Uploading..." : "Upload Documents"}
      </button>
    </div>
  );
}
