/* eslint-disable react/no-children-prop */
import React, { useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import styles from "./Home.module.scss";
import type { NextPage } from "next";
import {
  Badge,
  Box,
  Button,
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import Head from "next/head";

import axios from "../src/utils/axios";

const Home: NextPage = () => {
  const [searchInput, setSearchInput] = React.useState<string>("");
  const [searchedData, setSearchedData] = React.useState<boolean>(false);
  const [hackernewsData, setHackerNewsData] = React.useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/search?tags=front_page");
      setHackerNewsData(data.hits.slice(0, 10));
    };
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>HackerNews Search</title>
        <meta
          name="HackerNews Search"
          content="A GUI for searching hackernews blogs using their API's"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.HomeContainer}>
        <h1>Hackernews Search</h1>
        <section className={styles.InputContainer}>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<BsSearch />} />
            <Input type="text" placeholder="news title" />
          </InputGroup>
          <Button className={styles.Button} colorScheme="green" variant="solid">
            Search
          </Button>
        </section>
        {!searchedData && (
          <p className={styles.MessageText}>Recently Published Articles</p>
        )}
        {searchedData && hackernewsData.length > 0 ? (
          <p className={styles.MessageText}>Search Results</p>
        ) : searchedData && hackernewsData.length === 0 ? (
          <p className={styles.MessageText}>No results found!</p>
        ) : (
          <></>
        )}
        <section className={styles.ResultsContainer}>
          {hackernewsData.length > 0 &&
            hackernewsData.map((item: any, index: number) => {
              const { author, title } = item._highlightResult;
              console.log(item);
              return (
                <div key={index} className={styles.Card}>
                  <h1>{title.value}</h1>
                  <section className={styles.SubData}>
                    <h2>Author: {author.value}</h2>
                    <h2>Points: {item.points}</h2>
                  </section>
                </div>
              );
            })}
        </section>
      </main>
    </>
  );
};

export default Home;
