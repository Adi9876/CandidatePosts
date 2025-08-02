import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { WalletProvider } from "./context/WalletProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <WalletProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </WalletProvider>
);
