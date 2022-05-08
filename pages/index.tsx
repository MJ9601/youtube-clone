import { Center, Group } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ReactElement } from "react";
import { getAllVideosFunc } from "../api/serverRequests";
import VideoCard from "../components/VideoCard";
import PageLayout from "../layout/PageLayout";
import { Video } from "../typing";

const Home = ({ videos }: { videos: Video[] }) => {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <div
        style={{
          width: "95%",
          margin: "auto",
          padding: "30px 0",
          height: "95vh",
        }}
      >
        <Center style={{ width: "100%" }}>
          <Group grow spacing="md" position="left">
            {videos.map((video) => (
              <VideoCard key={video.videoId} videoInfo={video} />
            ))}
          </Group>
        </Center>
      </div>
    </div>
  );
};

Home.getLayout = (page: ReactElement) => <PageLayout>{page}</PageLayout>;

export default Home;

export const getServerSideProps = async () => {
  const videos = await getAllVideosFunc();

  return {
    props: {
      videos,
    },
  };
};
