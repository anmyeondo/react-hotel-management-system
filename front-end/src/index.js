import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: '"NSK-Midium"',
  },
  palette: {
    secondary: {
      main: "#DC143C",
    },
    primary: {
      main: "#483D8B",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
