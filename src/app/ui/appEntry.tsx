import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./appEntry.scss";
import { Provider } from "react-redux";
import { store } from "../model/appStore";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
