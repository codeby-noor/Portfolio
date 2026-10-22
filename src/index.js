import React from "react";
import { hydrateRoot } from "react-dom/client";
import "./styles/global.css";
import App from "./App";

hydrateRoot(
    document.getElementById("root"),
    <React.StrictMode>
        <App />
    </React.StrictMode>
);