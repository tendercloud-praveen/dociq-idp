// import { useMemo, useState, useEffect } from "react";
// import Pagination from "../common/Pagination";
// import { Eye, Pencil, FileText, Clock3, Search } from "lucide-react";

// import StatusBadge from "../common/StatusBadge";
// import ConfidenceBar from "../common/ConfidenceBar";

// export default function PendingTable({
//   files = [],
//   search,
//   setSearch,
//   selectedFile,
//   setSelectedFile,
//   setViewMode,
//   onView,
// }) {
//   const pendingFiles = useMemo(() => {
//     return files.filter((item) => {
//       return (
//         item.status === "Pending" &&
//         (item.file_name || "").toLowerCase().includes(search.toLowerCase())
//       );
//     });
//   }, [files, search]);

//   const rowsPerPage = 10;

//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [search]);

//   const totalPages = Math.ceil(pendingFiles.length / rowsPerPage);

//   const paginatedFiles = pendingFiles.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage,
//   );

//   return (
//     <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
//       <div className="p-6 border-b">
//         <div className="flex justify-between items-center">
//           <div>
//             <h2 className="text-xl font-semibold">Pending Review</h2>

//             <p className="text-sm text-gray-500 mt-1">
//               Documents waiting for manual verification
//             </p>
//           </div>

//           <div className="relative w-80">
//             <Search
//               className="absolute left-3 top-3.5 text-gray-400"
//               size={18}
//             />

//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full pl-10 py-3 rounded-xl border border-gray-200"
//               placeholder="Search..."
//             />
//           </div>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full min-w-[950px]">
//           <thead>
//             <tr className="bg-slate-50">
//               <th className="px-6 py-4">#</th>

//               <th className="px-6 py-4">Document</th>

//               <th className="px-6 py-4">Type</th>

//               <th className="px-6 py-4">Uploaded</th>

//               <th className="px-6 py-4">Status</th>

//               <th className="px-6 py-4">Confidence</th>

//               <th className="px-6 py-4 text-center">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {paginatedFiles.map((file, index) => (
//               <tr
//                 key={file.id}
//                 className={`border-t hover:bg-yellow-50 cursor-pointer ${
//                   selectedFile?.id === file.id ? "bg-yellow-50" : ""
//                 }`}
//                 onClick={() => setSelectedFile(file)}
//               >
//                 <td className="px-6 py-5">
//                   {(currentPage - 1) * rowsPerPage + index + 1}
//                 </td>{" "}
//                 <td className="px-6 py-5">
//                   <div className="flex gap-3">
//                     <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
//                       <Clock3 size={20} className="text-yellow-600" />
//                     </div>

//                     <div>
//                       <h4 className="font-semibold">{file.file_name}</h4>
//                       <p className="text-xs text-gray-500">
//                         {file.file_size || "--"}
//                       </p>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-6 py-5">{file.document_type}</td>
//                 <td className="px-6 py-5">
//                   {new Date(file.created_at).toLocaleString()}
//                 </td>
//                 <td className="px-6 py-5">
//                   <StatusBadge status={file.status} />
//                 </td>
//                 <td className="px-6 py-5 w-52">
//                   <ConfidenceBar value={file.confidence} />
//                 </td>
//                 <td className="px-6 py-5">
//                   <div className="flex items-center justify-center gap-2">
//                     {/* View Button */}
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         onView(file.id);
//                       }}
//                       className="w-10 h-10 rounded-xl border border-slate-200 hover:bg-slate-100 flex items-center justify-center transition"
//                       title="View"
//                     >
//                       <Eye size={18} className="text-slate-600" />
//                     </button>

//                     {/* Edit Button */}
//                     <button
//                       onClick={async (e) => {
//                         e.stopPropagation();

//                         onEdit(file.id);

//                         setViewMode(false);
//                       }}
//                       className="w-10 h-10 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition"
//                       title="Edit"
//                     >
//                       <Pencil size={18} className="text-blue-600" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}

//             {pendingFiles.length === 0 && (
//               <tr>
//                 <td colSpan={7} className="text-center py-12 text-gray-400">
//                   No Pending Files
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//         <div className="border-t p-5">
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             totalItems={pendingFiles.length}
//             onPageChange={setCurrentPage}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

import { useMemo, useState, useEffect } from "react";
import Pagination from "../common/Pagination";
import { Eye, Pencil, Clock3, Search } from "lucide-react";

import StatusBadge from "../common/StatusBadge";
import ConfidenceBar from "../common/ConfidenceBar";

export default function PendingTable({
  files = [],
  search,
  setSearch,
  selectedFile,
  setSelectedFile,
  setViewMode, // Received from parent container
  onView,
  onEdit,
}) {
  const pendingFiles = useMemo(() => {
    return files.filter((item) => {
      return (
        item.status === "Pending" &&
        (item.file_name || "").toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [files, search]);

  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const totalPages = Math.ceil(pendingFiles.length / rowsPerPage);

  const paginatedFiles = pendingFiles.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Pending Review</h2>
            <p className="text-sm text-gray-500 mt-1">
              Documents waiting for manual verification
            </p>
          </div>

          <div className="relative w-80">
            <Search
              className="absolute left-3 top-3.5 text-gray-400"
              size={18}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 py-3 rounded-xl border border-gray-200"
              placeholder="Search..."
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[950px]">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-4">Document</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Uploaded</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Confidence</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedFiles.map((file, index) => (
              <tr
                key={file.id}
                className={`border-t hover:bg-yellow-50 cursor-pointer ${
                  selectedFile?.id === file.id ? "bg-yellow-50" : ""
                }`}
                onClick={() => setSelectedFile(file)}
              >
                <td className="px-6 py-5">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </td>
                <td className="px-6 py-5">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <Clock3 size={20} className="text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{file.file_name}</h4>
                      <p className="text-xs text-gray-500">
                        {file.file_size || "--"}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">{file.document_type}</td>
                <td className="px-6 py-5">
                  {new Date(file.created_at).toLocaleString()}
                </td>
                <td className="px-6 py-5">
                  <StatusBadge status={file.status} />
                </td>
                <td className="px-6 py-5 w-52">
                  <ConfidenceBar value={file.confidence} />
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center justify-center gap-2">
                    {/* View Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onView(file.id);
                      }}
                      className="w-10 h-10 rounded-xl border border-slate-200 hover:bg-slate-100 flex items-center justify-center transition"
                      title="View"
                    >
                      <Eye size={18} className="text-slate-600" />
                    </button>

                    {/* Edit Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(file.id);
                      }}
                      className="w-10 h-10 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition"
                      title="Edit"
                    >
                      <Pencil size={18} className="text-blue-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {pendingFiles.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-12 text-gray-400">
                  No Pending Files
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="border-t p-5">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={pendingFiles.length}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
