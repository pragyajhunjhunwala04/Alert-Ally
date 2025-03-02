import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import "./font-awesome-4.7.0/css/font-awesome.min.css";

import Login from "./login"

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Login />
  </StrictMode>
);