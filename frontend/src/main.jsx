import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import { store } from "./redux/store";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2600,
          style: {
            background: "#0a0a0b",
            color: "#fff",
            borderRadius: "14px",
            padding: "12px 16px",
            fontSize: "14px",
            fontWeight: 500,
            boxShadow: "0 18px 40px -12px rgba(16,24,40,0.35)",
          },
          success: { iconTheme: { primary: "#e3ad3a", secondary: "#0a0a0b" } },
          error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
        }}
      />
      <App />
    </BrowserRouter>
  </Provider>,
);
