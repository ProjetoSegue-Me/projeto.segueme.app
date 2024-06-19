import Carregando from "@/components/Carregando";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Router } from "next/router";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
      document.body.classList.add("loading");
    };
    const handleComplete = () => {
      setLoading(false);
      document.body.classList.remove("loading");
    };

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleComplete);
    };
  }, []);
  return (
    <>
      {loading && <Carregando />}
      <Component {...pageProps} />
    </>
  );
}
