import {
  AspectRatio,
  Center,
  Container,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Head from "next/head";
import React, { ReactElement } from "react";
import { getUserFunc, getVideoFunc } from "../../api/serverRequests";
import PageLayout from "../../layout/PageLayout";
import { Video } from "../../typing";

const Video_ = ({ video }: { video: Video }) => {
  const createAt = new Date(video.createdAt);
  return (
    <>
      <Head>
        <title>{video.title}</title>
      </Head>
      <Container fluid>
        <Group grow position="left" spacing="xl" align="start">
          <AspectRatio ratio={1080 / 720} sx={{ maxWidth: "1080px" }}>
            <video
              src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/videos/${video.videoId}`}
              height="auto"
              width="720px"
              controls
              autoPlay
              id="video-player"
            />
          </AspectRatio>
          <Stack spacing="xs" pt={50} pl="lg">
            <Group grow position="left" spacing="md">
              <Title order={1}>{video.title}</Title>
            </Group>
            <Group grow position="left" spacing="md">
              <Text size="xl">{createAt.toDateString()}</Text>
            </Group>
            <Group grow position="left" spacing="md" pt="xl">
              <Text size="xl">{video.description}</Text>
            </Group>
          </Stack>
        </Group>
      </Container>
    </>
  );
};

Video_.getLayout = (page: ReactElement) => (
  <PageLayout user={page.props?.children?.props?.user}>{page}</PageLayout>
);

export default Video_;

// export const getStaticPaths: GetStaticPaths = async (ctx) => {
//   const videos = await getAllVideosFunc();

//   const paths = videos.map((video: Video) => ({
//     params: {
//       videoId: video.videoId,
//     },
//   }));

//   return {
//     paths,
//     fallback: "blocking",
//   };
// };

// export const getStaticProps: GetStaticProps = async (ctx) => {
//   const video = await getVideoFunc(String(ctx.params?.videoId));
//   const cookie = ctx?.previewData?.toString();
//   console.log(cookie);

//   if (!video) return { notFound: true };

//   return {
//     props: {
//       video,
//     },
//     revalidate: 60 * 3600,
//   };
// };

export const getServerSideProps = async ({
  req,
  params,
}: {
  req: any;
  params: any;
}) => {
  const video = await getVideoFunc(String(params?.videoId));
  const user = await getUserFunc({ req });
  if (!video) return { notFound: true };

  return {
    props: {
      video,
      user,
    },
  };
};
