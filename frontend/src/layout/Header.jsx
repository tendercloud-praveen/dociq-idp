import { Bell, Search, Sun, Moon, User, FileDown } from "lucide-react";
import ExportReportModal from "../components/reports/ExportReportModal";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 h-20 px-6 flex items-center justify-between">
      {/* Left */}

      <div className="flex items-center gap-5 flex-1">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Document AI Dashboard
          </h1>

          <p className="text-sm text-gray-500">
            Intelligent Document Processing System
          </p>
        </div>
      </div>

      {/* Center */}

      <div className="hidden lg:flex items-center gap-4">
        <div className="relative w-96">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />

          <input
            type="text"
            placeholder="Search documents..."
            className="w-full border rounded-xl py-3 pl-11 pr-4"
          />
        </div>

        <button
          onClick={() => setShowReportModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <FileDown size={18} />
          Reports
        </button>
      </div>

      {/* Right */}

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-100"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button className="relative w-11 h-11 rounded-xl border border-gray-200 hover:bg-gray-100 flex items-center justify-center">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3 py-2">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
            <User size={18} />
          </div>

          <div className="hidden md:block">
            <h4 className="text-sm font-semibold text-slate-800">
              {user?.full_name || "User"}
            </h4>

            <p className="text-xs text-gray-500">{user?.role || "User"}</p>
          </div>
        </div>
      </div>
      <ExportReportModal
        open={showReportModal}
        onClose={() => setShowReportModal(false)}
      />
    </header>
  );
}
