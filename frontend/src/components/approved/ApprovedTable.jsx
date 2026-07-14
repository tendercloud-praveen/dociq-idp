import Pagination from "../common/Pagination";
import { useMemo, useState, useEffect } from "react";
import { Eye, Download, CheckCircle2, Search } from "lucide-react";
import StatusBadge from "../common/StatusBadge";
import ConfidenceBar from "../common/ConfidenceBar";

export default function ApprovedTable({
  files = [],
  search = "",
  setSearch,
  selectedFile,
  setSelectedFile,
  onView,
}) {
  const filteredFiles = useMemo(() => {
    return files.filter((item) => {
      return (
        item.status === "Approved" &&
        (item.file_name || "").toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [files, search]);
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);
  const rowsPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredFiles.length / rowsPerPage);

  const paginatedFiles = filteredFiles.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
      {/* Header */}

      <div className="border-b px-6 py-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              Approved Files
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Successfully processed documents
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
              placeholder="Search approved files..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Table */}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="bg-slate-50 text-left">
              <th className="px-6 py-4 text-sm font-semibold">#</th>

              <th className="px-6 py-4 text-sm font-semibold">Document</th>

              <th className="px-6 py-4 text-sm font-semibold">Type</th>

              <th className="px-6 py-4 text-sm font-semibold">Uploaded</th>

              <th className="px-6 py-4 text-sm font-semibold">Status</th>

              <th className="px-6 py-4 text-sm font-semibold">Confidence</th>

              <th className="px-6 py-4 text-center text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredFiles.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-16 text-gray-400">
                  No Approved Documents
                </td>
              </tr>
            )}

            {paginatedFiles.map((file, index) => (
              <tr
                key={file.id}
                onClick={() => onView(file.id)}
                className={`border-t hover:bg-blue-50 transition cursor-pointer ${
                  selectedFile?.id === file.id ? "bg-blue-50" : ""
                }`}
                // onClick={() => setSelectedFile(file)}
              >
                <td className="px-6 py-5">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                      <CheckCircle2 className="text-blue-600" size={20} />
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-800">
                        {file.file_name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {file.file_size || "--"}
                      </p>{" "}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">
                    {file.document_type || "--"}
                  </span>
                </td>

                <td className="px-6 py-5 text-sm text-gray-500">
                  {new Date(file.created_at).toLocaleString()}
                </td>

                <td className="px-6 py-5">
                  <StatusBadge status={file.status} />
                </td>

                <td className="px-6 py-5 w-52">
                  <ConfidenceBar value={file.confidence} />
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onView(file.id);
                      }}
                      className="w-10 h-10 rounded-xl border hover:bg-blue-50 flex items-center justify-center"
                    >
                      <Eye size={18} />
                    </button>

                    <button className="w-10 h-10 rounded-xl border hover:bg-blue-50 flex items-center justify-center">
                      <Download size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Footer */}

      <div className="border-t bg-gray-50 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-500">
          Showing
          <span className="font-semibold text-slate-700 mx-1">
            {filteredFiles.length}
          </span>
          approved files
        </div>

        <div className="border-t p-5">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredFiles.length}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
