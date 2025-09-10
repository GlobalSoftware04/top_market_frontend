import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RibbonProvider } from "./services/RibbonProvider";
import { BrowserRouter } from "react-router-dom";
import { SwalProvider } from "./services/SweetAlert";
import { ToastProvider } from "vyrn";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RibbonProvider>
      <ToastProvider>
        <SwalProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SwalProvider>
      </ToastProvider>
    </RibbonProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
