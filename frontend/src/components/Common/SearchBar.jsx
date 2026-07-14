import { Search, Filter, RefreshCcw, Download } from "lucide-react";

export default function SearchBar({
  search,
  setSearch,
  filter,
  setFilter,
  onRefresh,
  onExport,
}) {
  return (
    <div className=" p-5">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left */}

        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          {/* Search */}

          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2
              w-4 h-4 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search files..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
              w-full
              pl-10
              pr-4
              py-3
              rounded-xl
              border
              border-gray-200
              focus:ring-2
              focus:ring-blue-500
              focus:border-blue-500
              outline-none
              text-sm"
            />
          </div>

          {/* Filter */}

          <div className="relative">
            <Filter
              className="absolute left-3 top-1/2 -translate-y-1/2
              w-4 h-4 text-gray-400"
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="
              appearance-none
              pl-10
              pr-10
              py-3
              rounded-xl
              border
              border-gray-200
              bg-white
              outline-none
              focus:ring-2
              focus:ring-blue-500
              text-sm"
            >
              <option value="All">All</option>

              <option value="Approved">Approved</option>

              <option value="Pending">Pending</option>

              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Right */}

        <div className="flex flex-wrap gap-3">
          <button
            onClick={onRefresh}
            className="
            flex
            items-center
            gap-2
            px-4
            py-3
            rounded-xl
            bg-gray-100
            hover:bg-gray-200
            transition"
          >
            <RefreshCcw className="w-4 h-4" />
            Refresh
          </button>

          <button
            onClick={onExport}
            className="
            flex
            items-center
            gap-2
            px-5
            py-3
            rounded-xl
            bg-blue-600
            hover:bg-blue-700
            text-white
            transition"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>
    </div>
  );
}
