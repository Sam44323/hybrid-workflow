/* eslint-disable react/no-children-prop */
import React, { useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import styles from "./Home.module.scss";
import type { NextPage } from "next";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";

import axios from "../src/utils/axios";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const toast = useToast();
  const router = useRouter();
  const [searchInput, setSearchInput] = React.useState<string>("");
  const [searchedData, setSearchedData] = React.useState<boolean>(false);
  const [hackernewsData, setHackerNewsData] = React.useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        toast.closeAll();
        toast({
          status: "success",
          position: "top",
          title: "Loading recently published articles",
          icon: <Spinner size={"sm"} />,
          duration: null,
        });
        const { data } = await axios.get("/search?tags=front_page");
        setHackerNewsData(data.hits.slice(0, 10));
        toast.closeAll();
      } catch (err) {
        console.log(err);
        toast({
          status: "error",
          position: "top",
          title: "Error while loading data",
        });
      }
    };
    fetchData();
  }, [toast]);

  const handleSearch = async () => {
    toast.closeAll();
    if (!searchInput.length) {
      toast({
        status: "error",
        position: "top",
        title: "Please enter a search term",
      });
      return;
    }
    try {
      toast({
        status: "success",
        position: "top",
        title: "Loading the search results...",
        icon: <Spinner size={"sm"} />,
        duration: null,
      });
      const { data } = await axios.get(`/search?query=${searchInput}`);
      setSearchedData(true);
      setHackerNewsData(data.hits);
      toast.closeAll();
    } catch (err) {
      console.log(err);
      toast({
        status: "error",
        position: "top",
        title: "Error while searching for the news",
      });
    }
  };

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
            <Input
              type="text"
              placeholder="news title"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </InputGroup>
          <Button
            className={styles.Button}
            colorScheme="green"
            variant="solid"
            onClick={handleSearch}
          >
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
              const { author } = item._highlightResult;
              console.log(item);
              return (
                <div
                  key={index}
                  className={styles.Card}
                  onClick={() => router.push("/article/" + item.objectID)}
                >
                  <h1>{item.title}</h1>
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
