import MainLayout from "../../components/Layout/MainLayout";
import React, { useState } from "react";
import { Link, Typography } from "@mui/material";
import { useRouteError } from "react-router-dom";
import NavigationBar from "../../components/NavBar/NavigationBar";

const ErrorPage = () => {
  const [error, setError] = useState(useRouteError());
  console.error(error);
  return (
    <MainLayout>
      <NavigationBar />
      <Typography variant="h1">Whoops!</Typography>
      <Typography variant="h2">Something went wrong:</Typography>
      <Typography variant="h3">
        Please report this error by joining our{" "}
        <Link href="https://discord.gg/jxusC4qdbD">Discord Server</Link> here.{" "}
      </Typography>
    </MainLayout>
  );
};

export default ErrorPage;
