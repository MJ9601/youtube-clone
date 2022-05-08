import { Button, Center, Group, Stack, Stepper, Text } from "@mantine/core";
import React, { ReactElement, useState } from "react";
import { getUserFunc } from "../api/serverRequests";
import PageLayout from "../layout/PageLayout";
import { User } from "../typing";

const Upload = () => {
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  return (
    <div style={{ width: "98%" }}>
      <Center style={{ width: "100%", height: "100%" }} px="xl" py="md">
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
            {active !== 3 && <Button onClick={nextStep}> Next step</Button>}
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
