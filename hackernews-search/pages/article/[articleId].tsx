import React from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Spinner, useToast } from "@chakra-ui/react";
import { Interweave } from "interweave";

import styles from "./Article.module.scss";
import axios from "../../src/utils/axios";

const Comments: React.FC<{
  text: string;
  author: string;
  children: {
    text: string;
    author: string;
    children: any[];
  }[];
}> = (props) => {
  const [comments, setComments] = React.useState<boolean>(false);

  console.log(props);

  return props.text ? (
    <div className={styles.Comments}>
      <Interweave
        content={props.text && props.text.substring(3, props.text.length - 4)}
      />
      {props.children.length > 0 && (
        <p
          onClick={() => setComments((prev) => !prev)}
          className={styles.ButtonShow}
        >
          Show nested thread
        </p>
      )}
      {props.children.length > 0 &&
        comments &&
        props.children.map((item, index) => <Comments {...item} key={index} />)}
    </div>
  ) : (
    <></>
  );
};

const Article: NextPage = (props: any) => {
  const toast = useToast();
  const [hasData, setHasData] = React.useState(false);

  console.log(props);
  React.useEffect(() => {
    if (props.articleId) {
      toast.closeAll();
      setHasData(true);
    } else {
      toast({
        status: "success",
        position: "top",
        title: "Loading the article...",
        icon: <Spinner size={"sm"} />,
        duration: null,
      });
    }
  }, [props, toast]);
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
      {hasData && (
        <div className={styles.ArticleContainer}>
          <section className={styles.TopData}>
            <h1>{props.data.title}</h1>
            <div className={styles.SubDataContainer}>
              <p>Points: {props.data.points}</p>
              <p>Author: {props.data.author}</p>
            </div>
          </section>
          <section className={styles.CommentsSection}>
            <h1>Comments for this post</h1>
            {props.data.children.map(
              (
                item: { text: string; author: string; children: [] },
                index: number
              ) => (
                <Comments {...item} key={index} />
              )
            )}
          </section>
        </div>
      )}
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
  let data;
  try {
    data = await axios.get(`/items/${context.params!.articleId}`);
  } catch (err) {
    console.log(err);
  }
  return {
    props: {
      articleId: context.params!.articleId,
      data: data ? data.data : null,
    },
  };
};

export default Article;
