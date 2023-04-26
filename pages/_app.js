import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [web, setWeb] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setWeb(true);
    }, 100);
  }, []);

  return <>{web && <Component {...pageProps} />}</>;
}
