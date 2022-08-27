import React from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";

import styles from "./Article.module.scss";
import axios from "../../src/utils/axios";

const Article: NextPage = (props) => {
  console.log(props);
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { articleId: "1" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      articleId: context.params!.articleId,
    },
  };
};

export default Article;
