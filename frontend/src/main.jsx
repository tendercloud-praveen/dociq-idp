// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// // import App from "./App.jsx";
// import { RouterProvider } from "react-router-dom";
// import router from "./components/routes/router.jsx";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <RouterProvider router={router} />
//   </StrictMode>,
// );

import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./components/routes/router";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";

function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={<Loader />}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Suspense>
  </React.StrictMode>,
);
