import { useState } from "react";
import { X, FileDown } from "lucide-react";
import { exportReport } from "../../services/documentservice";

export default function ExportReportModal({ open, onClose }) {
  const [period, setPeriod] = useState("today");
  const [reportType, setReportType] = useState("document");
  const [fileFormat, setFileFormat] = useState("pdf");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleExport = async () => {
    try {
      setLoading(true);

      const blob = await exportReport(period, reportType, fileFormat);

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download =
        fileFormat === "pdf" ? `Report-${period}.pdf` : `Report-${period}.xlsx`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

      onClose();
    } catch (err) {
      console.log(err);
      alert("Failed to export report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        {/* Header */}

        <div className="flex justify-between items-center border-b px-6 py-5">
          <h2 className="text-xl font-bold">Export Reports</h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Body */}

        <div className="p-6 space-y-5">
          <div>
            <label className="text-sm font-medium">Report Period</label>

            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full mt-2 border rounded-xl px-4 py-3"
            >
              <option value="today">Today</option>
              <option value="monthly">Monthly</option>
              <option value="all">All</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Report Type</label>

            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full mt-2 border rounded-xl px-4 py-3"
            >
              <option value="document">Document</option>
              <option value="audit">Audit</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Export Format</label>

            <select
              value={fileFormat}
              onChange={(e) => setFileFormat(e.target.value)}
              className="w-full mt-2 border rounded-xl px-4 py-3"
            >
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
            </select>
          </div>
        </div>

        {/* Footer */}

        <div className="border-t px-6 py-5 flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2 border rounded-xl">
            Cancel
          </button>

          <button
            onClick={handleExport}
            disabled={loading}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center gap-2"
          >
            <FileDown size={18} />

            {loading ? "Exporting..." : "Export Report"}
          </button>
        </div>
      </div>
    </div>
  );
}
