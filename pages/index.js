import { useCallback, useState } from "react";

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { fetchSignature, fetchVerification } from "../lib/client";

export default function Home() {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [triggered, setTriggered] = useState(false);

  const handleClick = async () => {
    try {
      setTriggered(true);

      // This makes a request that hashes the body and returns a signature to be used in the request below
      const { signature, signatureError } = await fetchSignature();

      if (signatureError) {
        throw new Error(signatureError);
      }

      /**
       *  This makes a request that verifies the signature and returns the data like a webhook would do
       *  Since the /api/webhook/order endpoint is protected by the middleware,
       *  it will only return the data if the signature is valid
       */
      const { error, data } = await fetchVerification(signature);

      if (error) {
        throw new Error(error);
      } else {
        setError(null);
        setData(data);
      }
    } catch (error) {
      setData(null);
      setError(error.message || `Something went wrong: ${error}`);
    } finally {
      setTriggered(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <div className={styles.grid}>
          <button
            className={styles.button}
            disabled={triggered}
            onClick={() => handleClick()}
          >
            {triggered ? "Please wait..." : "Simulate Webhook"}
          </button>

          {error && <div className={styles.error}>{error}</div>}

          {data && (
            <div className={styles.result}>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
