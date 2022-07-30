import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#172B3F",
    },
    secondary: {
      main: "#FF9100",
    },
    text: {
      primary: "rgba(51, 51, 51, 0.87)",
      secondary: "rgba(51, 51, 51, 0.60)",
      disabled: "rgba(51, 51, 51, 0.38)",
    },
    background: {
      default: "#ffffff",
      paper: "#ececec",
    },
    divider: "rgba(0, 0, 0, 0.12)",
  },
  typography: {
    fontFamily: "Hind",
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontFamily: "Roboto",
      fontWeight: 300,
    },
    h2: {
      fontFamily: "Roboto",
      fontWeight: 300,
    },
    h3: {
      fontFamily: "Roboto",
      fontWeight: 300,
    },
    h4: {
      fontFamily: "Roboto",
      fontWeight: 300,
    },
    h5: {
      fontFamily: "Roboto",
      fontWeight: 300,
    },
    h6: {
      fontFamily: "Roboto",
      fontWeight: 300,
    },
  },
});

export default theme;
