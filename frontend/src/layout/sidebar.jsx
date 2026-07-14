// import { NavLink } from "react-router-dom";
// import {
//   LayoutDashboard,
//   CheckCircle2,
//   Clock3,
//   XCircle,
//   Settings,
//   LogOut,
//   Menu,
//   X,
//   FileText,
// } from "lucide-react";
// import { useState } from "react";

// export default function Sidebar() {
//   const [open, setOpen] = useState(false);

//   const menus = [
//     {
//       name: "Dashboard",
//       path: "/dashboard",
//       icon: LayoutDashboard,
//     },
//     {
//       name: "Approved Files",
//       path: "/approved-files",
//       icon: CheckCircle2,
//     },
//     {
//       name: "Pending Files",
//       path: "/pending-files",
//       icon: Clock3,
//     },
//     {
//       name: "Rejected Files",
//       path: "/rejected-files",
//       icon: XCircle,
//     },
//   ];

//   return (
//     <>
//       {/* Mobile Toggle */}

//       <button
//         onClick={() => setOpen(true)}
//         className="lg:hidden fixed top-5 left-5 z-50 bg-blue-600 text-white p-2 rounded-lg shadow-lg"
//       >
//         <Menu size={22} />
//       </button>

//       {/* Overlay */}

//       {open && (
//         <div
//           onClick={() => setOpen(false)}
//           className="fixed inset-0 bg-black/40 z-40 lg:hidden"
//         />
//       )}

//       {/* Sidebar */}

//       <aside
//         className={`
//         fixed lg:static
//         top-0 left-0
//         z-50
//         h-screen
//         w-72
//         bg-white
//         border-r
//         border-gray-200
//         shadow-lg
//         transition-transform
//         duration-300
//         ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
//       `}
//       >
//         {/* Logo */}

//         <div className="flex items-center justify-between px-6 py-6 border-b">
//           <div className="flex items-center gap-3">
//             <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
//               <FileText className="text-white" size={24} />
//             </div>

//             <div>
//               <h2 className="font-bold text-xl">DocAI</h2>

//               <p className="text-xs text-gray-500">Document Intelligence</p>
//             </div>
//           </div>

//           <button className="lg:hidden" onClick={() => setOpen(false)}>
//             <X />
//           </button>
//         </div>

//         {/* Menu */}

//         <div className="p-5 space-y-2">
//           {menus.map((menu) => {
//             const Icon = menu.icon;

//             return (
//               <NavLink
//                 key={menu.path}
//                 to={menu.path}
//                 onClick={() => setOpen(false)}
//                 className={({ isActive }) =>
//                   `flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
//                     isActive
//                       ? "bg-blue-600 text-white shadow-md"
//                       : "text-gray-600 hover:bg-gray-100"
//                   }`
//                 }
//               >
//                 <Icon size={20} />

//                 <span className="font-medium">{menu.name}</span>
//               </NavLink>
//             );
//           })}
//         </div>

//         {/* Bottom Section */}

//         <div className="absolute bottom-0 left-0 right-0 p-5 border-t bg-white">
//           <NavLink
//             to="/settings"
//             className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition"
//           >
//             <Settings size={20} />
//             <span className="font-medium">Settings</span>
//           </NavLink>

//           <button className="mt-2 w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition">
//             <LogOut size={20} />

//             {/* <span className="font-medium">Logout</span> */}
//             <NavLink to="/login" className="font-medium">
//               Logout
//             </NavLink>
//           </button>
//         </div>
//       </aside>

//           </button>

//         </div>
//       </aside>
//     </>
//   );
// }
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CheckCircle2,
  Clock3,
  XCircle,
  Settings,
  LogOut,
  Menu,
  X,
  FileText,
} from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const menus = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Approved Files",
      path: "/approved-files",
      icon: CheckCircle2,
    },
    {
      name: "Pending Files",
      path: "/pending-files",
      icon: Clock3,
    },
    {
      name: "Rejected Files",
      path: "/rejected-files",
      icon: XCircle,
    },
  ];

  const handleLogout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    localStorage.removeItem("user");

    navigate("/login", { replace: true });
  };
  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-5 left-5 z-50 bg-blue-600 text-white p-2 rounded-lg shadow-lg cursor-pointer hover:bg-blue-500 transition"
      >
        <Menu size={22} />
      </button>

      {/* Mobile Backdrop Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Navigation Drawer Aside */}
      <aside
        className={`
          fixed lg:static
          top-0 left-0
          z-50
          h-screen
          w-72
          bg-white
          border-r
          border-gray-200
          shadow-lg lg:shadow-none
          transition-transform
          duration-300
          flex flex-col justify-between
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header Block / Logo */}
        <div>
          <div className="flex items-center justify-between px-6 py-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/10">
                <FileText className="text-white" size={22} />
              </div>

              <div>
                <h2 className="font-bold text-lg text-slate-900 tracking-tight leading-none">
                  DocAI
                </h2>
                <p className="text-[11px] text-gray-400 font-medium mt-1">
                  Document Intelligence
                </p>
              </div>
            </div>

            <button
              className="lg:hidden text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {/* Links Menu Wrapper */}
          <div className="p-5 space-y-1.5">
            {menus.map((menu) => {
              const Icon = menu.icon;

              return (
                <NavLink
                  key={menu.path}
                  to={menu.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                        : "text-gray-600 hover:bg-gray-50 hover:text-slate-900"
                    }`
                  }
                >
                  <Icon size={18} />
                  <span>{menu.name}</span>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Persistent Bottom Controls Panel */}
        <div className="p-5 border-t bg-white space-y-1">
          <NavLink
            to="/settings"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl font-medium text-sm transition ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-50 hover:text-slate-900"
              }`
            }
          >
            <SidebarSettingsIcon wrapper={Settings} />
          </NavLink>

          {/* Corrected: Use NavLink directly as the outer interactive block */}
          <button
            onClick={() => {
              setOpen(false);
              handleLogout();
            }}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition font-medium text-sm cursor-pointer"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

// Helper wrapper component for dynamic static layout cleanups
function SidebarSettingsIcon({ wrapper: IconComponent }) {
  return (
    <>
      <IconComponent size={18} />
      <span>Settings</span>
    </>
  );
}
