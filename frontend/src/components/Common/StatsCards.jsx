// import { FileText, CheckCircle2, Clock3, XCircle } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export default function StatsCards({ stats }) {
//   const navigate = useNavigate();

//   const cards = [
//     {
//       title: "Total Files",
//       value: stats?.total || 0,
//       subtitle: "All Uploaded Files",
//       icon: FileText,
//       bg: "bg-blue-50",
//       iconBg: "bg-blue-100",
//       iconColor: "text-blue-600",
//       textColor: "text-blue-600",
//       action: null,
//     },
//     {
//       title: "Approved",
//       value: stats?.approved || 0,
//       subtitle:
//         stats?.total > 0
//           ? `${((stats.approved / stats.total) * 100).toFixed(1)}%`
//           : "0%",
//       icon: CheckCircle2,
//       bg: "bg-green-50",
//       iconBg: "bg-green-100",
//       iconColor: "text-green-600",
//       textColor: "text-green-600",
//       action: () => navigate("/approved-files"),
//       button: "View Approved Files →",
//     },
//     {
//       title: "Pending",
//       value: stats?.pending || 0,
//       subtitle:
//         stats?.total > 0
//           ? `${((stats.pending / stats.total) * 100).toFixed(1)}%`
//           : "0%",
//       icon: Clock3,
//       bg: "bg-amber-50",
//       iconBg: "bg-amber-100",
//       iconColor: "text-amber-600",
//       textColor: "text-amber-600",
//       action: () => navigate("/pending-files"),
//       button: "View Pending Files →",
//     },
//     {
//       title: "Rejected",
//       value: stats?.rejected || 0,
//       subtitle:
//         stats?.total > 0
//           ? `${((stats.rejected / stats.total) * 100).toFixed(1)}%`
//           : "0%",
//       icon: XCircle,
//       bg: "bg-red-50",
//       iconBg: "bg-red-100",
//       iconColor: "text-red-600",
//       textColor: "text-red-600",
//       action: () => navigate("/rejected-files"),
//       button: "View Rejected Files →",
//     },
//   ];

//   return (
//     <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
//       {" "}
//       {cards.map((card) => {
//         const Icon = card.icon;

//         return (
//           <div
//             key={card.title}
//             className={`${card.bg} rounded-xl p-3 border border-gray-200 shadow-sm hover:shadow-lg transition duration-300`}
//           >
//             <div className="flex justify-between items-start">
//               <div>
//                 <p className={`text-sm font-semibold ${card.textColor}`}>
//                   {card.title}
//                 </p>

//                 <h2 className="text-2xl font-bold mt-2 text-slate-800">
//                   {card.value}
//                 </h2>

//                 <p className="text-xs text-gray-500 mt-2">{card.subtitle}</p>
//               </div>

//               <div className={`${card.iconBg} p-2 rounded-lg`}>
//                 <Icon className={`${card.iconColor} w-5 h-5`} />
//               </div>
//             </div>

//             {card.button && (
//               <button
//                 onClick={card.action}
//                 className={`mt-6 text-sm font-semibold ${card.textColor} hover:underline`}
//               >
//                 {card.button}
//               </button>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

import { FileText, CheckCircle2, Clock3, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function StatsCards({ stats }) {
  const navigate = useNavigate();
  const total = stats?.total || 0;

  const cards = [
    {
      title: "Total Files",
      value: total,
      subtitle: "All uploaded files",
      icon: FileText,
      bg: "bg-white",
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
      action: null,
    },
    {
      title: "Approved",
      value: stats?.approved || 0,
      subtitle:
        total > 0 ? `${((stats.approved / total) * 100).toFixed(2)}%` : "0.00%",
      icon: CheckCircle2,
      bg: "bg-white",
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
      action: () => navigate("/approved-files"),
      button: "View Approved Files →",
    },
    {
      title: "Rejected",
      value: stats?.rejected || 0,
      subtitle:
        total > 0 ? `${((stats.rejected / total) * 100).toFixed(2)}%` : "0.00%",
      icon: XCircle,
      bg: "bg-white",
      iconColor: "text-rose-600",
      iconBg: "bg-rose-50",
      action: () => navigate("/rejected-files"),
      button: "View Rejected Files →",
    },
    {
      title: "Pending",
      value: stats?.pending || 0,
      subtitle:
        total > 0 ? `${((stats.pending / total) * 100).toFixed(2)}%` : "0.00%",
      icon: Clock3,
      bg: "bg-white",
      iconColor: "text-amber-500",
      iconBg: "bg-amber-50",
      action: () => navigate("/pending-files"),
      button: "View Pending Files →",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className={`${card.bg} rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col justify-between h-full group`}
          >
            <div>
              <div className="flex justify-between items-center gap-2">
                <div
                  className={`${card.iconBg} p-1.5 rounded-lg border border-slate-100`}
                >
                  <Icon className={`${card.iconColor} w-4 h-4`} />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right truncate">
                  {card.title}
                </span>
              </div>

              <div className="flex items-baseline justify-between mt-3">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  {card.value}
                </h2>
                <span className={`text-xs font-bold ${card.iconColor}`}>
                  {card.subtitle}
                </span>
              </div>
            </div>

            {card.button && (
              <button
                onClick={card.action}
                className={`mt-3 w-full text-left text-[10px] font-bold ${card.iconColor} opacity-70 group-hover:opacity-100 transition-opacity`}
              >
                {card.button}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
