import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store  from "../src/state/store.tsx";
import App from "./App.tsx";
import "./interface/styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
