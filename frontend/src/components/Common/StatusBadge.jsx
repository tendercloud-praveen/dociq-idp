export default function StatusBadge({ status }) {
  const styles = {
    Approved: "bg-green-100 text-green-700 border border-green-200",

    Pending: "bg-yellow-100 text-yellow-700 border border-yellow-200",

    Rejected: "bg-red-100 text-red-700 border border-red-200",
  };

  const dot = {
    Approved: "bg-green-500",

    Pending: "bg-yellow-500",

    Rejected: "bg-red-500",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
        styles[status] || "bg-gray-100 text-gray-700 border border-gray-200"
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full ${dot[status] || "bg-gray-500"}`}
      />

      {status}
    </span>
  );
}
