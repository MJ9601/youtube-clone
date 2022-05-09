import {
  Box,
  Button,
  Center,
  Group,
  Paper,
  RingProgress,
  Stack,
  Stepper,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { useMutation } from "react-query";
import { FileUpload } from "tabler-icons-react";
import {
  getUserFunc,
  updateVideoInfoFunc,
  uploadVideoFileFunc,
} from "../api/serverRequests";
import PageLayout from "../layout/PageLayout";
import { Video } from "../typing";

const Upload = () => {
  const router = useRouter();

  const [active, setActive] = useState(0);
  const [files, setFiles] = useState<null | File[]>(null);
  const [progress, setProgress] = useState(0);
  const [payload, setPayload] = useState<{
    title?: string;
    description?: string;
    published?: boolean;
  }>();
  const [vidTitle, setVidTitle] = useState<string>("");
  const [vidDesc, setVidDesc] = useState<string>("");
  const [videoId, setVideoId] = useState<string>("");

  const config = {
    onUploadProgress: (progressEvent: any) =>
      setProgress(
        Math.round((progressEvent.loaded * 100) / progressEvent.total)
      ),
  };

  const fileUpload = async (files: File[]): Promise<Video> => {
    const formData = new FormData();
    formData.append("video", files[0]);
    return await uploadVideoFileFunc({ formData, config });
  };

  const nextStep = async () => {
    setActive((current) => (current < 3 ? current + 1 : current));
    if (active == 0) {
      setVideoId((await fileUpload(files as File[])).videoId);
    } else if (active == 1) {
      setPayload({ title: vidTitle, description: vidDesc });
    } else if (active == 2) {
      await updateVideoInfoFunc({
        videoId,
        ...payload,
        published: true,
      });
      router.push(`/videos/${videoId}`);
    }
  };

  return (
    <div style={{ width: "100%", padding: "0 20px", position: "relative" }}>
      {progress < 100 && progress != 0 && (
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: "0",
            left: "0",
            background: "#333",
            zIndex: "10",
            opacity: ".8",
            display: "grid",
            placeItems: "center",
          }}
        >
          <RingProgress
            sections={[{ value: progress, color: "green" }]}
            label={
              <Text color="green" weight="bold" align="center" size="xl">
                {progress}%
              </Text>
            }
          />
        </div>
      )}
      <Center
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        px="xl"
        py="md"
      >
        <Box sx={{ width: "80%", height: "43vh" }}>
          <>
            {active === 0 && (
              <>
                {!files ? (
                  <Dropzone
                    onDrop={(files) => {
                      setFiles(files);
                    }}
                    accept={[MIME_TYPES.mp4]}
                    multiple={false}
                    sx={{ height: "70%" }}
                  >
                    {(status) => (
                      <Stack
                        align="center"
                        spacing="lg"
                        sx={{ height: "100%" }}
                      >
                        <FileUpload size={60} strokeWidth={2} />
                        <Text size="xl" weight="bold">
                          Drag video file here or Click to add
                        </Text>
                        <Text size="md" color={"gray"}>
                          In the current version only .mp4 is allowed
                        </Text>
                      </Stack>
                    )}
                  </Dropzone>
                ) : (
                  <>
                    <Title order={2}>File is Submitted</Title>
                    <Text size="md"> {files[0]?.name}</Text>
                  </>
                )}
              </>
            )}
          </>
          <>
            {active == 1 && (
              <Center sx={{ height: "70%", width: "100%" }}>
                <Paper
                  shadow="xs"
                  sx={{ height: "100%", width: "100%" }}
                  p="xs"
                >
                  <Stack p="md">
                    <TextInput
                      label="Video title"
                      placeholder="video title"
                      value={vidTitle}
                      onChange={(e) => {
                        setVidTitle(e.target.value);
                      }}
                    />
                    <Textarea
                      label="Video description"
                      placeholder="this content is about ..."
                      value={vidDesc}
                      onChange={(e) => {
                        setVidDesc(e.target.value);
                      }}
                    />
                  </Stack>
                </Paper>
              </Center>
            )}
          </>
          <>
            {active == 2 && (
              <Stack
                sx={{
                  height: "70%",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Title order={2}>The process is almost finished</Title>
                <Title order={3}>Confirm Publishing your content</Title>
              </Stack>
            )}
          </>
        </Box>

        <Stack sx={{ width: "80%", minWidth: "300px", maxWidth: "800px" }}>
          <Group grow position="center"></Group>
          <Group grow position="center">
            <Stepper active={active} onStepClick={setActive} breakpoint="sm">
              <Stepper.Step label="First step" description="Add video file">
                <Center
                  sx={{
                    width: "100%",
                    fontWeight: "bold",
                    fontSize: "20px",
                    marginTop: "10px",
                  }}
                >
                  Step 1 content: Drag/Add a video file into drop zone
                </Center>
              </Stepper.Step>

              <Stepper.Step
                label="Second step"
                description="Add title and description"
              >
                <Center
                  sx={{
                    width: "100%",
                    fontWeight: "bold",
                    fontSize: "20px",
                    marginTop: "10px",
                  }}
                >
                  Step 2 content: Add title and description for your content
                </Center>
              </Stepper.Step>

              <Stepper.Step label="Final step" description="Publishing">
                <Center
                  sx={{
                    width: "100%",
                    fontWeight: "bold",
                    fontSize: "20px",
                    marginTop: "10px",
                  }}
                >
                  Step 3 content: confirm publishing your content
                </Center>
              </Stepper.Step>
            </Stepper>
          </Group>
          <Group position="center" mt="md">
            {active !== 3 && (
              <Button disabled={!files} onClick={nextStep}>
                {" "}
                Next step
              </Button>
            )}
          </Group>
        </Stack>
      </Center>
    </div>
  );
};

Upload.getLayout = (page: ReactElement) => (
  <PageLayout uploadPage user={page.props?.children?.props?.user}>
    {page}
  </PageLayout>
);
export default Upload;

export const getServerSideProps = async ({ req }: { req: any }) => {
  const user = await getUserFunc({ req });

  return {
    props: {
      user,
    },
  };
};
