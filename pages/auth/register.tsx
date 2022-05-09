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
import { registerUserFunc } from "../../api/serverRequests";
import PageLayout from "../../layout/PageLayout";
import { User } from "../../typing";
import { getServerSideProps } from "../upload";

const Register = ({ user }: { user: User }) => {
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
  }, []);

  const registerForm = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length < 7 ? "Invalid password" : null),
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match!" : null,
    },
  });

  const mutation = useMutation<
    string,
    AxiosError,
    Parameters<typeof registerUserFunc>["0"]
  >(registerUserFunc, {
    onMutate: () => {
      showNotification({
        id: "register",
        title: "Creating account",
        message: "Please wait ...",
        loading: true,
      });
    },
    onSuccess: () => {
      updateNotification({
        id: "register",
        title: "Created",
        message: "Account created successfully",
      });
      router.push("/auth/login");
    },
    onError: () => {
      updateNotification({
        id: "register",
        title: "Error",
        message: "Something went wrong! ",
      });
    },
  });

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>

      <Container>
        <Center style={{ width: "100%", height: "95vh" }}>
          <Paper shadow="md" p="sm" sx={{ width: "300px" }}>
            <form
              onSubmit={registerForm.onSubmit((values) =>
                mutation.mutate(values)
              )}
            >
              <Stack spacing="md">
                <TextInput
                  required
                  label="Username"
                  placeholder="Username"
                  {...registerForm.getInputProps("username")}
                />
                <TextInput
                  required
                  label="Email"
                  placeholder="example@.com"
                  {...registerForm.getInputProps("email")}
                />
                <PasswordInput
                  required
                  label="Password"
                  placeholder="Password"
                  description="Password must be at least 6 letters!"
                  {...registerForm.getInputProps("password")}
                />
                <PasswordInput
                  required
                  label="Password"
                  placeholder="Password"
                  {...registerForm.getInputProps("confirmPassword")}
                />
                <Group grow>
                  <Button type="submit">Register</Button>
                </Group>
              </Stack>
            </form>
          </Paper>
        </Center>
      </Container>
    </>
  );
};

Register.getLayout = (page: ReactElement) => <PageLayout>{page}</PageLayout>;
export default Register;

export { getServerSideProps };
