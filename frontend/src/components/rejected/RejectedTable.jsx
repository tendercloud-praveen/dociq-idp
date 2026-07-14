import { useMemo, useState, useEffect } from "react";
import Pagination from "../common/Pagination";
import { XCircle, Eye, Search } from "lucide-react";

import StatusBadge from "../common/StatusBadge";
import ConfidenceBar from "../common/ConfidenceBar";

export default function RejectedTable({
  files = [],
  search = "",
  setSearch,
  selectedFile,
  setSelectedFile,
  onView,
}) {
  const rejectedFiles = useMemo(() => {
    return files.filter((item) => {
      return (
        item.status === "Rejected" &&
        (item.file_name || "").toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [files, search]);
  const rowsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const totalPages = Math.ceil(rejectedFiles.length / rowsPerPage);

  const paginatedFiles = rejectedFiles.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
      {/* Header */}

      <div className="p-6 border-b">
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              Rejected Documents
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Documents rejected after review
            </p>
          </div>

          <div className="relative w-full lg:w-80">
            <Search
              className="absolute left-3 top-3.5 text-gray-400"
              size={18}
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search rejected files..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none"
            />
          </div>
        </div>
      </div>

      {/* Table */}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[950px]">
          <thead>
            <tr className="bg-red-50">
              <th className="px-6 py-4 text-left">#</th>

              <th className="px-6 py-4 text-left">Document</th>

              <th className="px-6 py-4 text-left">Type</th>

              <th className="px-6 py-4 text-left">Uploaded</th>

              <th className="px-6 py-4 text-left">Status</th>

              <th className="px-6 py-4 text-left">Confidence</th>

              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedFiles.map((file, index) => (
              <tr
                key={file.id}
                onClick={() => onView(file.id)}
                className={`border-t hover:bg-red-50 cursor-pointer ${
                  selectedFile?.id === file.id ? "bg-red-50" : ""
                }`}
              >
                <td className="px-6 py-5">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </td>

                <td className="px-6 py-5">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                      <XCircle className="text-red-600" size={20} />
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

                <td className="px-6 py-5 w-56">
                  <ConfidenceBar value={file.confidence} />
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onView(file.id);
                      }}
                      className="w-10 h-10 rounded-xl border hover:bg-red-50 flex items-center justify-center"
                    >
                      <Eye size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {rejectedFiles.length === 0 && (
              <tr>
                <td colSpan={7} className="py-16 text-center text-gray-400">
                  No Rejected Documents
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="border-t p-5">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={rejectedFiles.length}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
