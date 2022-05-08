import {
  Button,
  Center,
  Container,
  Group,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import React, { ReactElement } from "react";
import PageLayout from "../../layout/PageLayout";

const Login = () => {
  return (
    <Container>
      <Center style={{ width: "100%", height: "95vh" }}>
        <Paper shadow="md" p="sm" sx={{ width: "300px" }}>
          <form>
            <Stack spacing="md">
              <TextInput required label="Email" placeholder="example@.com" />
              <PasswordInput
                required
                label="Password"
                placeholder="Password"
                description="Password must be at least 6 letters!"
              />
              <Group grow>
                <Button>Login</Button>
              </Group>
            </Stack>
          </form>
        </Paper>
      </Center>
    </Container>
  );
};

Login.getLayout = (page: ReactElement) => <PageLayout>{page}</PageLayout>;
export default Login;
