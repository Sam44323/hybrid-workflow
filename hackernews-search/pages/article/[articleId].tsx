import React from "react";
import { NextPage } from "next";

import styles from "./Article.module.scss";
import Head from "next/head";

const Article: NextPage = () => {
  return (
    <>
      <Head>
        <title>Article</title>
        <meta
          name="HackerNews Search"
          content="A GUI for searching hackernews blogs using their API's"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
};

export default Article;
