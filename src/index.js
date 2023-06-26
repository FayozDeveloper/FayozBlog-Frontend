import React from "react";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import {BrowserRouter as Router} from "react-router-dom";
import "./index.scss";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <CssBaseline  />
    <ThemeProvider theme={theme}>
        <Router>
            <Provider store={store}>
                <App />
            </Provider>
        </Router>
    </ThemeProvider>
  </>
);
