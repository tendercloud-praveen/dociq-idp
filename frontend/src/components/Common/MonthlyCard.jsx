// import {
//   CalendarRange,
//   FileText,
//   CheckCircle2,
//   Clock3,
//   XCircle,
// } from "lucide-react";

// export default function MonthlyCard({ data }) {
//   return (
//     <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">
//       <div className="flex items-center gap-3 mb-5">
//         <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center">
//           <CalendarRange className="text-purple-600" size={22} />
//         </div>

//         <div>
//           <h2 className="font-bold text-lg text-slate-800">Monthly Report</h2>

//           <p className="text-sm text-slate-500">Current month statistics</p>
//         </div>
//       </div>

//       <div className="space-y-4">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center gap-2">
//             <FileText className="text-blue-500" size={18} />
//             <span>Total Documents</span>
//           </div>

//           <span className="font-bold text-xl">{data?.total || 0}</span>
//         </div>

//         <div className="flex justify-between items-center">
//           <div className="flex items-center gap-2">
//             <CheckCircle2 className="text-green-500" size={18} />
//             <span>Approved</span>
//           </div>

//           <span className="font-semibold text-green-600">
//             {data?.approved || 0}
//           </span>
//         </div>

//         <div className="flex justify-between items-center">
//           <div className="flex items-center gap-2">
//             <Clock3 className="text-yellow-500" size={18} />
//             <span>Pending</span>
//           </div>

//           <span className="font-semibold text-yellow-600">
//             {data?.pending || 0}
//           </span>
//         </div>

//         <div className="flex justify-between items-center">
//           <div className="flex items-center gap-2">
//             <XCircle className="text-red-500" size={18} />
//             <span>Rejected</span>
//           </div>

//           <span className="font-semibold text-red-600">
//             {data?.rejected || 0}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

import {
  CalendarRange,
  FileText,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

export default function MonthlyCard({ data }) {
//   const report = data?.monthly || data || {};
const report = data || {};

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
          <CalendarRange className="text-purple-600" size={24} />
        </div>

        <div>
          <h2 className="font-bold text-xl text-slate-800">Monthly Report</h2>

          <p className="text-sm text-slate-500">Current month statistics</p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <FileText className="text-blue-600" size={20} />
            <span>Total Documents</span>
          </div>

          <span className="font-bold text-2xl">{report.total ?? 0}</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-green-600" size={20} />
            <span>Approved</span>
          </div>

          <span className="font-semibold text-green-600">
            {report.approved ?? 0}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Clock3 className="text-yellow-600" size={20} />
            <span>Pending</span>
          </div>

          <span className="font-semibold text-yellow-600">
            {report.pending ?? 0}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <XCircle className="text-red-600" size={20} />
            <span>Rejected</span>
          </div>

          <span className="font-semibold text-red-600">
            {report.rejected ?? 0}
          </span>
        </div>
      </div>
    </div>
  );
}
