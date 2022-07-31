import React from "react";
import { createRoot } from "react-dom/client";

import { styled } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import PageFooter from "./components/pageFooter";
import PageHeader from "./components/pageHeader";

import defaultTheme from "./theme";

const ContextBox = styled(Box)(({ theme }) => ({
  position: "relative",
  flex: "1 0 0px",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "strech",
  justifyContent: "space-between",
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(1, 2),
  gap: theme.spacing(2),
}));

const App: React.FC = () => {
  return (
    <>
      <PageHeader />
      <ContextBox>
        <Button variant="contained">Hello, World!</Button>
      </ContextBox>
      <PageFooter />
    </>
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
