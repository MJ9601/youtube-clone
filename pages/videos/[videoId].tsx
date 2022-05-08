import { GetStaticPaths, GetStaticProps } from "next";
import React, { ReactElement } from "react";
import { getAllVideosFunc, getVideoFunc } from "../../api/serverRequests";
import PageLayout from "../../layout/PageLayout";
import { Video } from "../../typing";

const Video_ = ({ video }: { video: Video }) => {
  console.log(video);
  return <div>Video</div>;
};

Video_.getLayout = (page: ReactElement) => <PageLayout>{page}</PageLayout>;

export default Video_;

export const getStaticPaths: GetStaticPaths = async () => {
  const videos = await getAllVideosFunc();

  const paths = videos.map((video: Video) => ({
    params: {
      videoId: video.videoId,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const video = await getVideoFunc(String(params?.videoId));

  if (!video) return { notFound: true };

  return {
    props: {
      video,
    },
    revalidate: 60 * 3600,
  };
};
