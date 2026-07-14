import {
  FileText,
  Download,
  Eye,
  Calendar,
  User,
  BadgeCheck,
} from "lucide-react";
import StatusBadge from "./StatusBadge";
import ConfidenceBar from "./ConfidenceBar";

export default function FilePreview({ file }) {
  if (!file) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 text-center">
        <FileText className="mx-auto h-16 w-16 text-gray-300" />
        <h3 className="mt-4 text-lg font-semibold text-gray-700">
          No File Selected
        </h3>
        <p className="text-sm text-gray-500 mt-2">
          Select a document from the table to preview its details.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Preview */}

      <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="border-b p-5 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-lg">Document Preview</h2>

            <p className="text-sm text-gray-500 mt-1">{file.name}</p>
          </div>

          <div className="flex gap-2">
            <button className="p-2 rounded-lg border hover:bg-gray-100">
              <Eye size={18} />
            </button>

            <button className="p-2 rounded-lg border hover:bg-gray-100">
              <Download size={18} />
            </button>
          </div>
        </div>

        <div className="h-[500px] bg-gray-100 flex items-center justify-center rounded-b-2xl">
          {file.preview ? (
            <img
              src={file.preview}
              alt="preview"
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <FileText className="w-24 h-24 text-gray-300" />
          )}
        </div>
      </div>

      {/* Details */}

      <div className="space-y-6">
        {/* Information */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h3 className="font-semibold text-lg mb-5">Document Information</h3>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500">File Name</span>

              <span className="font-medium">{file.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Type</span>

              <span className="font-medium">{file.type}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Uploaded</span>

              <span className="font-medium flex items-center gap-2">
                <Calendar size={15} />

                {file.uploadedAt}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Uploaded By</span>

              <span className="font-medium flex items-center gap-2">
                <User size={15} />
                Admin
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-500">Status</span>

              <StatusBadge status={file.status} />
            </div>
          </div>
        </div>

        {/* Confidence */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h3 className="font-semibold text-lg mb-4">AI Confidence</h3>

          <ConfidenceBar value={file.confidence} />
        </div>

        {/* Extracted */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <BadgeCheck className="text-blue-600" size={18} />

            <h3 className="font-semibold text-lg">Extracted Data</h3>
          </div>

          <div className="space-y-3 text-sm">
            {file.extractedData ? (
              Object.entries(file.extractedData).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b pb-2">
                  <span className="text-gray-500 capitalize">{key}</span>

                  <span className="font-medium">{value}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No extracted data available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
