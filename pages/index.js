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
        <meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1, maximum-scale=1"></meta>
        <meta name="description" content="take order app" />
        <meta name="mobile-web-app-capable" content="yes"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <TakeOrder/>
      </ThemeProvider>
    </>


  )
}
