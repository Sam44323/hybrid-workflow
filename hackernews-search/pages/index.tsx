/* eslint-disable react/no-children-prop */
import React, { useEffect } from "react";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import styles from "./Home.module.scss";
import type { NextPage } from "next";
import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import Head from "next/head";

import axios from "../src/utils/axios";

const Home: NextPage = () => {
  const [searchInput, setSearchInput] = React.useState<string>("");
  const [hackernewsData, setHackerNewsData] = React.useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/search?tags=front_page");
      setHackerNewsData(data.hits);
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
        <section className={styles.ResultsContainer}>
          <Grid templateColumns="repeat(5, 1fr)" gap={6}>
            {hackernewsData.length > 0 &&
              hackernewsData.map((item: any, index: number) => {
                console.log(item);
                return (
                  <Box w="300px" rounded="20px" overflow="hidden" key={index}>
                    <Image
                      src={`/api/imagefetcher?url=${encodeURIComponent(
                        "https://media.geeksforgeeks.org/wp-content/uploads/20210727094649/img1.jpg"
                      )}`}
                      alt="Card Image"
                      height={300}
                      width={300}
                    />
                    <Box p={5}>
                      <Stack align="center">
                        <Badge
                          variant="solid"
                          colorScheme="green"
                          rounded="full"
                          px={2}
                        >
                          GeeksForGeeks
                        </Badge>
                      </Stack>
                      <Flex>
                        <Spacer />
                        <Button variant="solid" colorScheme="green" size="sm">
                          Learn More
                        </Button>
                      </Flex>
                    </Box>
                  </Box>
                );
              })}
          </Grid>
        </section>
      </main>
    </>
  );
};

export default Home;
