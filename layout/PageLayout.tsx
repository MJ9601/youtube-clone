import { AppShell, Box, Header, Footer, Group, Text } from "@mantine/core";
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
        <Header p="sm" height={"60px"} fixed>
          <Group spacing={'lg'}></Group>
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
