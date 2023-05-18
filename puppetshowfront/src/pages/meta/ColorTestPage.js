import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Card, CardContent, Grid, Paper } from "@mui/material";

const theme = createTheme({
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
});

const ColorTestPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Paper>
          <Grid>
            <Grid container spacing={2} paddingTop={4} paddingBottom={4}>
              <Grid item xs={6}>
                <Paper>
                  <Card>
                    <CardContent>These are words</CardContent>
                  </Card>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <Card>
                    <CardContent>These are also words.</CardContent>
                  </Card>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default ColorTestPage;
