import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import DJCard from "components/DJCard";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>DJID</title>
        <meta name="description" content="Create your own DJ trading card!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>DJID</h1>

        <p className={styles.description}>
          inspired by{" "}
          <a href="https://k7.com/dj-kicks-trading-cards-are-back/">
            K7 trading cards
          </a>
        </p>
        <DJCard />
      </main>

      <footer className={styles.footer}>
        <span>
          created by{" "}
          <a href="https://github.com/soleilyasmina">@soleilyasmina</a>{" "}
        </span>
      </footer>
    </div>
  );
};

export default Home;
