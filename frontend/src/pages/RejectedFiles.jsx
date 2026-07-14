import { useEffect, useState } from "react";

import DashboardLayout from "../layout/Dashboardlayout";

import UploadCard from "../components/common/UploadCard";
import StatsCards from "../components/common/StatsCards";
import DocumentBreakdown from "../components/common/DocumentBreakdown";
import SearchBar from "../components/common/SearchBar";

import RejectedTable from "../components/rejected/RejectedTable";
import RejectedDetails from "../components/rejected/RejectedDetails";

import {
  uploadDocuments,
  getRejectedDocuments,
  getDashboardSummary,
  getDocumentById,
  getAuditTrail,
} from "../services/documentService";
export default function RejectedFiles() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [auditTrail, setAuditTrail] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  const [breakdown, setBreakdown] = useState({
    invoices: 0,
    resumes: 0,
    panCards: 0,
    unknown: 0,
  });

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("Rejected");

  const [dragActive, setDragActive] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  // async function loadDashboard() {
  //   try {
  //     const [summary, response] = await Promise.all([
  //       getDashboardSummary(),
  //       getRejectedDocuments(),
  //     ]);

  //     const documents =
  //       response.documents || response.files || response.data || response;

  //     setFiles(documents);

  //     setStats({
  //       total: summary.total,
  //       approved: summary.approved,
  //       pending: summary.pending,
  //       rejected: summary.rejected,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  async function loadDashboard() {
    try {
      const [summary, response] = await Promise.all([
        getDashboardSummary(),
        getRejectedDocuments(),
      ]);

      const documents =
        response.documents || response.files || response.data || response;

      setFiles(documents);

      setStats({
        total: summary.overall.total,
        approved: summary.overall.approved,
        pending: summary.overall.pending,
        rejected: summary.overall.rejected,
      });

      setBreakdown({
        invoices: documents.filter((d) => d.document_type === "Invoice").length,

        resumes: documents.filter((d) => d.document_type === "Resume").length,

        panCards: documents.filter((d) => d.document_type === "PAN").length,

        unknown: documents.filter((d) => d.document_type === "Unknown").length,
      });
    } catch (err) {
      console.log(err);
    }
  }
  const handleFileChange = (e) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();

    setDragActive(false);

    if (e.dataTransfer.files) {
      setSelectedFiles(Array.from(e.dataTransfer.files));
    }
  };

  async function handleUpload() {
    if (selectedFiles.length === 0) return;

    try {
      setLoading(true);

      await uploadDocuments(selectedFiles);

      setSelectedFiles([]);

      loadDashboard();
    } finally {
      setLoading(false);
    }
  }
  const handleView = async (id) => {
    try {
      const document = await getDocumentById(id);

      setSelectedFile(document);

      try {
        const audit = await getAuditTrail(id);
        setAuditTrail(audit);
      } catch (err) {
        console.log("No Audit Trail");
        setAuditTrail(null);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="space-y-6">
      {/* Upload + Stats */}
      <div className="grid xl:grid-cols-12 gap-6">
        <div className="xl:col-span-4">
          <UploadCard
            files={selectedFiles}
            loading={loading}
            isDragActive={dragActive}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
            handleFileChange={handleFileChange}
            handleSubmit={handleUpload}
          />
        </div>

        <div className="xl:col-span-8 space-y-6">
          <StatsCards stats={stats} />

          <DocumentBreakdown breakdown={breakdown} stats={stats} />
        </div>
      </div>
      {/* Search */}
      <SearchBar
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        onRefresh={loadDashboard}
        onExport={() => {}}
      />
      {/* Table */}
      <RejectedTable
        files={files}
        search={search}
        setSearch={setSearch}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        onView={handleView}
      />
      {/* Details */}
      <RejectedDetails file={selectedFile} auditTrail={auditTrail} />{" "}
    </div>
  );
}
