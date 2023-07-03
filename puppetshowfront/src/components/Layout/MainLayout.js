import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Paper } from "@mui/material";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#1577ef",
    },
    secondary: {
      main: "#25c760",
    },
    background: {
      default: "#0b132b",
    },
    info: {
      main: "#b1cebb",
    },
    warning: {
      main: "#ed6c02",
    },
  },
  contrastThreshold: 4.5,
});

const styles = {
  bigScreenBox: {
    // width: "calc(100% - 2in)",
    // height: "calc(100% - 3in)",
    width: "95%",
    height: "95%",
    margin: 2,
    padding: 1,
    display: "flex",
  },
};

const MainLayout = (props) => {
  return (
    <ThemeProvider theme={customTheme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginLeft: 5,
          marginRight: 5,
          marginTop: 3,
          marginBottom: 3,
        }}
      >
        {props.children}
      </Box>
    </ThemeProvider>
  );
};

export default MainLayout;
