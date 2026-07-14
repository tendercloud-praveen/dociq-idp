import { useEffect, useState } from "react";
import {
  Eye,
  Download,
  FileText,
  FileSpreadsheet,
  FileBadge2,
  RefreshCw,
  Clock3,
  XCircle,
} from "lucide-react";
import UploadCard from "../components/common/UploadCard";
import StatsCards from "../components/common/StatsCards";
import DocumentBreakdown from "../components/common/DocumentBreakdown";
import SearchBar from "../components/common/SearchBar";
import Pagination from "../components/common/Pagination";
import StatusBadge from "../components/common/StatusBadge";
import ConfidenceBar from "../components/common/ConfidenceBar";
import WeeklyCard from "../components/common/WeeklyCard";
import MonthlyCard from "../components/common/MonthlyCard";
// import { uploadDocuments, getDocuments } from "../services/documentservice";
import {
  uploadDocuments,
  getDocuments,
  getDashboardSummary,
  getApprovedDocuments,
  getPendingDocuments,
  getRejectedDocuments,
  // getWeeklyDocuments,
  // getMonthlyDocuments,
} from "../services/documentservice";

export default function Dashboard() {
  const [files, setFiles] = useState([]);
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
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [activeCard, setActiveCard] = useState("All");
  const [weeklyData, setWeeklyData] = useState({});
  const [monthlyData, setMonthlyData] = useState({});

  useEffect(() => {
    setPage(1);
  }, [search, filter, rows]);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      // const [
      //   summary,
      //   documentsResponse,
      //   // approvedResponse,
      //   // pendingResponse,
      //   // rejectedResponse,
      //   weekly,
      //   monthly,
      // ] = await Promise.all([
      //   getDashboardSummary(),
      //   getDocuments(),
      //   getApprovedDocuments(),
      //   getPendingDocuments(),
      //   getRejectedDocuments(),
      //   getWeeklyDocuments(),
      //   getMonthlyDocuments(),
      // ]);

      const [summary, documentsResponse] = await Promise.all([
        getDashboardSummary(),
        getDocuments(),
      ]);

      // setWeeklyData(weekly);
      // setMonthlyData(monthly);

      // const weeklyReport = {
      //   total: weekly.length,
      //   approved: weekly.filter((d) => d.status === "Approved").length,
      //   pending: weekly.filter((d) => d.status === "Pending").length,
      //   rejected: weekly.filter((d) => d.status === "Rejected").length,
      // };

      // const monthlyReport = {
      //   total: monthly.length,
      //   approved: monthly.filter((d) => d.status === "Approved").length,
      //   pending: monthly.filter((d) => d.status === "Pending").length,
      //   rejected: monthly.filter((d) => d.status === "Rejected").length,
      // };

      // setWeeklyData(weeklyReport);
      // setMonthlyData(monthlyReport);

      const documents = Array.isArray(documentsResponse)
        ? documentsResponse
        : documentsResponse.documents || documentsResponse.files || [];

      setFiles(documents);

      setStats({
        total: summary.overall.total,
        approved: summary.overall.approved,
        pending: summary.overall.pending,
        rejected: summary.overall.rejected,
      });

      setWeeklyData(summary.today);

      setMonthlyData(summary.monthly);

      setBreakdown({
        all: {
          invoices: documents.filter((d) => d.document_type === "Invoice")
            .length,
          resumes: documents.filter((d) => d.document_type === "Resume").length,
          panCards: documents.filter((d) => d.document_type === "PAN").length,
          unknown: documents.filter((d) => d.document_type === "Unknown")
            .length,
        },

        Approved: {
          invoices: documents.filter(
            (d) => d.status === "Approved" && d.document_type === "Invoice",
          ).length,

          resumes: documents.filter(
            (d) => d.status === "Approved" && d.document_type === "Resume",
          ).length,

          panCards: documents.filter(
            (d) => d.status === "Approved" && d.document_type === "PAN",
          ).length,

          unknown: documents.filter(
            (d) => d.status === "Approved" && d.document_type === "Unknown",
          ).length,
        },

        Pending: {
          invoices: documents.filter(
            (d) => d.status === "Pending" && d.document_type === "Invoice",
          ).length,

          resumes: documents.filter(
            (d) => d.status === "Pending" && d.document_type === "Resume",
          ).length,

          panCards: documents.filter(
            (d) => d.status === "Pending" && d.document_type === "PAN",
          ).length,

          unknown: documents.filter(
            (d) => d.status === "Pending" && d.document_type === "Unknown",
          ).length,
        },

        Rejected: {
          invoices: documents.filter(
            (d) => d.status === "Rejected" && d.document_type === "Invoice",
          ).length,

          resumes: documents.filter(
            (d) => d.status === "Rejected" && d.document_type === "Resume",
          ).length,

          panCards: documents.filter(
            (d) => d.status === "Rejected" && d.document_type === "PAN",
          ).length,

          unknown: documents.filter(
            (d) => d.status === "Rejected" && d.document_type === "Unknown",
          ).length,
        },
      });
    } catch (err) {
      console.error(err);
    }
  }

  function handleFileChange(e) {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  }

  function handleDrag(e) {
    e.preventDefault();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else setDragActive(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files) {
      setSelectedFiles(Array.from(e.dataTransfer.files));
    }
  }

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

  const filteredFiles = files.filter((file) => {
    const matchesSearch = (file.file_name || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      activeCard === "All" ? true : file.status === activeCard;

    const matchesFilter = filter === "All" ? true : file.status === filter;

    return matchesSearch && matchesStatus && matchesFilter;
  });

  const totalPages = Math.ceil(filteredFiles.length / rows);
  const startIndex = (page - 1) * rows;
  const endIndex = startIndex + rows;
  const paginatedFiles = filteredFiles.slice(startIndex, endIndex);

  // Helper percentages for clean inline rendering
  const approvedPct =
    stats.total > 0 ? ((stats.approved / stats.total) * 100).toFixed(1) : "0.0";
  const rejectedPct =
    stats.total > 0 ? ((stats.rejected / stats.total) * 100).toFixed(1) : "0.0";
  const pendingPct =
    stats.total > 0 ? ((stats.pending / stats.total) * 100).toFixed(1) : "0.0";

  const metricCards = [
    {
      key: "All",
      title: "Total Files",
      value: stats.total,
      subtitle: "All uploaded",
      icon: FileText,
      color: "blue",
    },
    {
      key: "Approved",
      title: "Approved",
      value: stats.approved,
      subtitle: `${approvedPct}%`,
      icon: FileBadge2,
      color: "emerald",
    },
    {
      key: "Rejected",
      title: "Rejected",
      value: stats.rejected,
      subtitle: `${rejectedPct}%`,
      icon: XCircle,
      color: "rose",
    },
    {
      key: "Pending",
      title: "Pending",
      value: stats.pending,
      subtitle: `${pendingPct}%`,
      icon: Clock3,
      color: "amber",
    },
  ];

  const tableConfig = {
    All: {
      title: "Recent Documents",
      subtitle: "All uploaded documents",
    },
    Approved: {
      title: "Approved Files",
      subtitle: "Successfully processed documents",
    },
    Pending: {
      title: "Pending Files",
      subtitle: "Waiting for review",
    },
    Rejected: {
      title: "Rejected Files",
      subtitle: "Rejected documents",
    },
  };
  const currentBreakdown =
    activeCard === "All" ? breakdown.all : breakdown[activeCard];
  return (
    <div className="space-y-5 p-2 sm:p-4 max-w-[1600px] mx-auto text-slate-800 antialiased">
      {/* TOP DASHBOARD METRIC LAYER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* COMPACT UPLOAD INTERFACE CONTAINER */}
        <div className="lg:col-span-4 xl:col-span-3 flex">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm flex flex-col justify-between w-full">
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
        </div>

        {/* METRICS PLATFORM */}
        <div className="lg:col-span-8 xl:col-span-9 flex flex-col justify-between gap-4">
          {/* STATS COUNTER GRIDS */}

          {/* Total Files Card */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {metricCards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.key}
                  onClick={() => {
                    setActiveCard(card.key);
                    setPage(1);
                  }}
                  className={`
            cursor-pointer
            bg-white
            rounded-xl
            border
            p-4
            transition-all
            duration-300
            ${
              activeCard === card.key
                ? "border-blue-600 ring-2 ring-blue-200 shadow-xl scale-105 opacity-100"
                : "border-slate-200 opacity-60 hover:opacity-100"
            }
          `}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        card.color === "blue"
                          ? "bg-blue-100 text-blue-600"
                          : card.color === "emerald"
                            ? "bg-emerald-100 text-emerald-600"
                            : card.color === "rose"
                              ? "bg-rose-100 text-rose-600"
                              : "bg-amber-100 text-amber-600"
                      }`}
                    >
                      <Icon size={20} />
                    </div>

                    <span className="text-xs uppercase text-gray-400 font-semibold">
                      {card.title}
                    </span>
                  </div>

                  <h2 className="text-3xl font-bold mt-5">{card.value}</h2>

                  <p className="text-sm text-gray-500 mt-1">{card.subtitle}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <WeeklyCard data={weeklyData} />
            <MonthlyCard data={monthlyData} />
          </div>
          {/* DOCUMENT TYPE SUB-BREAKDOWNS */}
          {/* <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Document Type Breakdown ({stats.total})
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {
                  label: "Invoices",
                  count: currentBreakdown?.invoices || 0,
                  color: "bg-blue-50 text-blue-700 border-blue-100",
                },
                {
                  label: "Resumes",
                  count: currentBreakdown?.resumes || 0,
                  color: "bg-purple-50 text-purple-700 border-purple-100",
                },
                {
                  label: "PAN Cards",
                  count: currentBreakdown?.panCards || 0,
                  color: "bg-orange-50 text-orange-700 border-orange-100",
                },
                {
                  label: "Unknown",
                  count: currentBreakdown?.unknown || 0,
                  color: "bg-slate-50 text-slate-600 border-slate-200",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-2.5 border border-slate-200/70 rounded-xl flex justify-between items-center shadow-sm min-w-0"
                >
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${item.color} truncate`}
                  >
                    {item.label}
                  </span>
                  <div className="text-right shrink-0 ml-2">
                    <span className="text-xs font-bold text-slate-800 block">
                      {item.count || 0}
                    </span>
                    <span className="text-[9px] text-slate-400 font-semibold">
                      {stats.total > 0
                        ? ((item.count / stats.total) * 100).toFixed(0)
                        : 0}
                      %
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          {/* FILE STATUS TIMELINE MAPPER */}
          <div className="bg-white p-3 border border-slate-200/80 rounded-xl shadow-sm">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              File Status Distribution Overview
            </div>
            <div className="w-full h-2 rounded-full flex overflow-hidden bg-slate-100 mb-2">
              <div
                style={{ width: `${approvedPct}%` }}
                className="bg-emerald-500 h-full transition-all duration-500"
              />
              <div
                style={{ width: `${rejectedPct}%` }}
                className="bg-rose-500 h-full transition-all duration-500"
              />
              <div
                style={{ width: `${pendingPct}%` }}
                className="bg-amber-500 h-full transition-all duration-500"
              />
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] font-bold text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />{" "}
                Approved ({stats.approved})
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />{" "}
                Rejected ({stats.rejected})
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />{" "}
                Pending ({stats.pending})
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="bg-white p-2 rounded-xl border border-slate-200/80 shadow-sm">
        <SearchBar
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
          onRefresh={loadDashboard}
          onExport={() => {}}
        />
      </div>

      {/* CORE RECENT DATA PLATFORM */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 px-5 py-3 flex items-center justify-between bg-white">
          <div>
            <h2 className="text-2xl font-bold">
              {tableConfig[activeCard].title}
            </h2>

            <p className="text-gray-500 text-sm">
              {tableConfig[activeCard].subtitle}
            </p>
          </div>
          <button
            onClick={loadDashboard}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 border border-slate-200 rounded-lg transition"
            title="Refresh Pipeline"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left text-xs border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 font-bold">
                <th className="px-5 py-3 w-12 text-center">#</th>
                <th className="px-5 py-3">File Name</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Uploaded On</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Confidence</th>
                <th className="px-5 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
              {paginatedFiles.length > 0 ? (
                paginatedFiles.map((file, index) => (
                  <tr
                    key={file.id || index}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-5 py-3 text-center text-slate-400 font-normal">
                      {startIndex + index + 1}
                    </td>

                    <td className="px-5 py-3 font-semibold text-slate-900 max-w-xs truncate">
                      <div className="flex items-center gap-2.5">
                        <span className="text-base select-none">
                          {file.document_type === "Invoice"
                            ? "📑"
                            : file.document_type === "Resume"
                              ? "👔"
                              : file.document_type === "PAN"
                                ? "🪪"
                                : "📄"}
                        </span>
                        <span className="truncate group-hover:text-blue-600 transition-colors">
                          {file.file_name}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          file.document_type === "Invoice"
                            ? "bg-blue-50 text-blue-600 border border-blue-100"
                            : file.document_type === "Resume"
                              ? "bg-purple-50 text-purple-600 border border-purple-100"
                              : file.document_type === "PAN"
                                ? "bg-orange-50 text-orange-600 border border-orange-100"
                                : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {file.document_type || "Unknown"}
                      </span>
                    </td>

                    <td className="px-5 py-3 text-slate-400 text-[11px]">
                      {new Date(file.created_at).toLocaleString([], {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>

                    <td className="px-5 py-3">
                      <StatusBadge status={file.status} />
                    </td>

                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2 w-28">
                        <span className="font-bold w-8 text-right text-slate-700">
                          {file.confidence}%
                        </span>
                        <div className="flex-1">
                          <ConfidenceBar value={file.confidence} />
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-3 text-center">
                      <div className="inline-flex justify-center gap-1">
                        <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md border border-slate-200/60 bg-white shadow-sm transition">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md border border-slate-200/60 bg-white shadow-sm transition">
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="py-12 text-center text-slate-400 font-semibold tracking-wide"
                  >
                    No active document nodes found matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION PANEL FOOTER */}
        <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-100">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={filteredFiles.length}
            rowsPerPage={rows}
            setRowsPerPage={setRows}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}
