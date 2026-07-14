export default function ConfidenceBar({ value = 0 }) {
  let color = "bg-red-500";

  if (value >= 90) {
    color = "bg-green-500";
  } else if (value >= 70) {
    color = "bg-yellow-500";
  }

  return (
    <div className="flex items-center gap-3 w-full">
      <span className="text-sm font-semibold text-slate-700 w-12">
        {value}%
      </span>

      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={`${color} h-full rounded-full transition-all duration-500`}
          style={{
            width: `${value}%`,
          }}
        />
      </div>
    </div>
  );
}
