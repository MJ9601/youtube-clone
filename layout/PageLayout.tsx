import {
  AppShell,
  Box,
  Header,
  Footer,
  Group,
  Text,
  AspectRatio,
  Image,
  Button,
} from "@mantine/core";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { User } from "../typing";

const PageLayout = ({
  user,
  children,
  uploadPage,
}: {
  user?: User;
  children: ReactElement;
  uploadPage?: boolean;
}) => {
  const router = useRouter();

  return (
    <AppShell
      styles={{
        main: {
          padding: "0",
        },
      }}
      header={
        <Header height={"60px"} sx={{ position: "sticky", top: "0" }}>
          <Group spacing={"lg"} grow position="apart">
            <AspectRatio ratio={1080 / 520} style={{ maxWidth: "130px" }}>
              <Image src="/logo.png" />
            </AspectRatio>
            <Group position="right" pr="md" spacing="xs">
              {!user ? (
                <>
                  <Button
                    variant="subtle"
                    onClick={() => router.push("/auth/login")}
                  >
                    Sign in
                  </Button>
                  <Button
                    variant="subtle"
                    onClick={() => router.push("/auth/register")}
                  >
                    Sign Up
                  </Button>
                </>
              ) : (
                <>
                  {!uploadPage && (
                    <Button
                      variant="gradient"
                      onClick={() => router.push("/upload")}
                    >
                      Upload Video
                    </Button>
                  )}
                </>
              )}
            </Group>
          </Group>
        </Header>
      }
      footer={
        <Footer p="lg" height={60}>
          <Group></Group>
        </Footer>
      }
    >
      {children}
    </AppShell>
  );
};

export default PageLayout;
