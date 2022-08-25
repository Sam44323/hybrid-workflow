/* eslint-disable react/no-children-prop */
import React from "react";
import { BsSearch } from "react-icons/bs";
import styles from "./Home.module.scss";
import type { NextPage } from "next";
import { Button, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import Head from "next/head";

const Home: NextPage = () => {
  const [searchInput, setSearchInput] = React.useState<string>("");
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
      </main>
    </>
  );
};

export default Home;
