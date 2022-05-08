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
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import PageLayout from "../../layout/PageLayout";

const Login = () => {
  const router = useRouter();

  const loginForm = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      password: (value) => value.length < 6 && "Invalid Password",
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const loginUser = () => {};

  return (
    <Container>
      <Center style={{ width: "100%", height: "95vh" }}>
        <Paper shadow="md" p="sm" sx={{ width: "300px" }}>
          <form onSubmit={loginForm.onSubmit((values) => loginUser())}>
            <Stack spacing="md">
              <TextInput
                required
                label="Email"
                placeholder="example@.com"
                {...loginForm.getInputProps("email")}
              />
              <PasswordInput
                required
                label="Password"
                placeholder="Password"
                description="Password must be at least 6 letters!"
                {...loginForm.getInputProps("password")}
              />
              <Group grow>
                <Button type="submit">Login</Button>
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
