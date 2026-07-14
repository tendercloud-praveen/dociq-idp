// import { ChevronLeft, ChevronRight } from "lucide-react";

// export default function Pagination({
//   currentPage,
//   totalPages,
//   onPageChange,
//   rowsPerPage,
//   setRowsPerPage,
//   totalItems,
// }) {
//   return (
//     <div className="bg-white border border-gray-200 rounded-2xl shadow-sm px-6 py-4 mt-6">
//       <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//         {/* Left */}

//         <div className="text-sm text-gray-500">
//           Showing page
//           <span className="font-semibold text-slate-800 mx-1">
//             {currentPage}
//           </span>
//           of
//           <span className="font-semibold text-slate-800 mx-1">
//             {totalPages}
//           </span>
//           ({totalItems} records)
//         </div>

//         {/* Right */}

//         <div className="flex items-center gap-6">
//           {/* Rows */}

//           <div className="flex items-center gap-2">
//             <span className="text-sm text-gray-500">Rows</span>

//             <select
//               value={rowsPerPage}
//               onChange={(e) => setRowsPerPage(Number(e.target.value))}
//               className="
//               border
//               border-gray-300
//               rounded-lg
//               px-3
//               py-2
//               text-sm
//               focus:ring-2
//               focus:ring-blue-500
//               outline-none"
//             >
//               <option value={5}>5</option>

//               <option value={10}>10</option>

//               <option value={25}>25</option>

//               <option value={50}>50</option>
//             </select>
//           </div>

//           {/* Pagination */}

//           <div className="flex items-center gap-2">
//             <button
//               disabled={currentPage === 1}
//               onClick={() => onPageChange(currentPage - 1)}
//               className="
//               w-10
//               h-10
//               rounded-xl
//               border
//               border-gray-200
//               flex
//               items-center
//               justify-center
//               hover:bg-gray-100
//               disabled:opacity-40
//               disabled:cursor-not-allowed"
//             >
//               <ChevronLeft size={18} />
//             </button>

//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//               <button
//                 key={page}
//                 onClick={() => onPageChange(page)}
//                 className={`w-10 h-10 rounded-xl font-semibold transition
//                   ${
//                     page === currentPage
//                       ? "bg-blue-600 text-white"
//                       : "bg-white border border-gray-200 hover:bg-gray-100"
//                   }`}
//               >
//                 {page}
//               </button>
//             ))}

//             <button
//               disabled={currentPage === totalPages}
//               onClick={() => onPageChange(currentPage + 1)}
//               className="
//               w-10
//               h-10
//               rounded-xl
//               border
//               border-gray-200
//               flex
//               items-center
//               justify-center
//               hover:bg-gray-100
//               disabled:opacity-40
//               disabled:cursor-not-allowed"
//             >
//               <ChevronRight size={18} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { ChevronLeft, ChevronRight } from "lucide-react";

// export default function Pagination({
//   currentPage,
//   totalPages,
//   totalItems,
//   rowsPerPage,
//   setRowsPerPage,
//   onPageChange,
// }) {
//   const start = totalItems === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
//   const end = Math.min(currentPage * rowsPerPage, totalItems);

//   const getPages = () => {
//     const pages = [];

//     let startPage = Math.max(1, currentPage - 1);
//     let endPage = Math.min(totalPages, startPage + 3);

//     if (endPage - startPage < 3) {
//       startPage = Math.max(1, endPage - 3);
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(i);
//     }

//     return pages;
//   };

//   return (
//     <div className="bg-white border border-gray-200 rounded-xl px-5 py-4">
//       <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
//         {/* Left */}

//         <p className="text-sm text-gray-500">
//           Showing <span className="font-semibold text-black">{start}</span> to{" "}
//           <span className="font-semibold text-black">{end}</span> of{" "}
//           <span className="font-semibold text-black">{totalItems}</span> entries
//         </p>

//         {/* Right */}

//         <div className="flex flex-wrap items-center gap-5">
//           {/* Pagination */}

//           <div className="flex items-center gap-2">
//             <button
//               disabled={currentPage === 1}
//               onClick={() => onPageChange(currentPage - 1)}
//               className="w-9 h-9 rounded-lg border flex items-center justify-center hover:bg-gray-100 disabled:opacity-40"
//             >
//               <ChevronLeft size={18} />
//             </button>

//             {getPages().map((page) => (
//               <button
//                 key={page}
//                 onClick={() => onPageChange(page)}
//                 className={`w-9 h-9 rounded-lg transition font-medium ${
//                   currentPage === page
//                     ? "bg-blue-600 text-white"
//                     : "border border-gray-200 hover:bg-gray-100"
//                 }`}
//               >
//                 {page}
//               </button>
//             ))}

//             <button
//               disabled={currentPage === totalPages}
//               onClick={() => onPageChange(currentPage + 1)}
//               className="w-9 h-9 rounded-lg border flex items-center justify-center hover:bg-gray-100 disabled:opacity-40"
//             >
//               <ChevronRight size={18} />
//             </button>
//           </div>

//           {/* Rows */}

//           <div className="flex items-center gap-2">
//             <span className="text-sm text-gray-500">Rows per page:</span>

//             <select
//               value={rowsPerPage}
//               onChange={(e) => setRowsPerPage(Number(e.target.value))}
//               className="border rounded-lg px-3 py-2 text-sm outline-none"
//             >
//               <option value={5}>5</option>
//               <option value={10}>10</option>
//               <option value={25}>25</option>
//               <option value={50}>50</option>
//             </select>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
}) {
  const rowsPerPage = 10;

  const start = totalItems === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const end = Math.min(currentPage * rowsPerPage, totalItems);

  const getPages = () => {
    const pages = [];

    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, startPage + 3);

    if (endPage - startPage < 3) {
      startPage = Math.max(1, endPage - 3);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl px-5 py-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing <span className="font-semibold text-black">{start}</span> to{" "}
          <span className="font-semibold text-black">{end}</span> of{" "}
          <span className="font-semibold text-black">{totalItems}</span> entries
        </p>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="w-9 h-9 rounded-lg border flex items-center justify-center hover:bg-gray-100 disabled:opacity-40"
          >
            <ChevronLeft size={18} />
          </button>

          {getPages().map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-9 h-9 rounded-lg transition font-medium ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "border border-gray-200 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="w-9 h-9 rounded-lg border flex items-center justify-center hover:bg-gray-100 disabled:opacity-40"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
