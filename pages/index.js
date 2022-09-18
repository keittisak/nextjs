import Head from 'next/head'
import { useState, useEffect, useMemo } from "react";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Soft UI Dashboard React themes
import theme from "assets/theme";

import TakeOrder from "components/TakeOrder";


export default function Home() {
  return (
    <>
      <Head>
        <title>Take Order App</title>
        <meta name="description" content="take order app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <TakeOrder/>
      </ThemeProvider>
    </>


  )
}
