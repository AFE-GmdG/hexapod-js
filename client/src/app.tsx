import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { styled } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import Box from "@mui/material/Box";

import PageFooter from "./components/pageFooter";
import PageHeader from "./components/pageHeader";

import Slash from "./views/slash";

import defaultTheme from "./theme";

const ContextBox = styled(Box)(({ theme }) => ({
  position: "relative",
  flex: "1 0 0px",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "strech",
  justifyContent: "space-between",
  backgroundColor: "#484848",
  padding: theme.spacing(1, 2),
  gap: theme.spacing(2),
}));

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <PageHeader />
      <ContextBox>
        <Routes>
          <Route path="/" element={<Slash />} />
        </Routes>
      </ContextBox>
      <PageFooter />
    </BrowserRouter>
  );
};

const appDiv = document.getElementById("app");
const root = createRoot(appDiv!);
root.render(
  <ThemeProvider theme={defaultTheme}>
    <GlobalStyles styles={{
      html: {
        height: "100%",
        userSelect: "none",
      },
      body: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        margin: 0,
      },
      "#app": {
        display: "flex",
        flexDirection: "column",
        flex: "1 0 0px",
      },
    }} />
    <CssBaseline />
    <App />
  </ThemeProvider>,
);
