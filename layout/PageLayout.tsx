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
import { ReactElement } from "react";

const PageLayout = ({ children }: { children: ReactElement }) => {
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
              <Button variant="subtle">Sign in</Button>
              <Button variant="subtle">Sign Up</Button>
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
