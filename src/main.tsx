import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { router } from "./routes/router.tsx";
import { store } from "./redux/store.ts";
// The project's own stylesheet, which carries the design tokens. This
// previously imported tailwind directly, leaving index.css unused.
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster theme="system" richColors closeButton position="top-right" />
    </Provider>
  </React.StrictMode>
);
