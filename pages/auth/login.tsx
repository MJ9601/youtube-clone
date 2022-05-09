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
import { showNotification, updateNotification } from "@mantine/notifications";
import { AxiosError } from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import { useMutation } from "react-query";
import { loginUserFunc } from "../../api/serverRequests";
import PageLayout from "../../layout/PageLayout";
import { User } from "../../typing";
import { getServerSideProps } from "../upload";

const Login = ({ user }: { user: User }) => {
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
  }, []);

  const loginForm = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      password: (value) => (value.length < 7 ? "Invalid Password" : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const mutation = useMutation<
    string,
    AxiosError,
    Parameters<typeof loginUserFunc>["0"]
  >(loginUserFunc, {
    onSuccess: () => {
      router.push("/");
    },
  });

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>

      <Container>
        <Center style={{ width: "100%", height: "95vh" }}>
          <Paper shadow="md" p="sm" sx={{ width: "300px" }}>
            <form
              onSubmit={loginForm.onSubmit((values) => mutation.mutate(values))}
            >
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
    </>
  );
};

Login.getLayout = (page: ReactElement) => <PageLayout>{page}</PageLayout>;
export default Login;

export { getServerSideProps };
