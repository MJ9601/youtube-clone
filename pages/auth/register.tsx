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

const Register = () => {
  const router = useRouter();

  const registerForm = useForm({
    initialValues: {
      usrename: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => value.length < 6 && "Invalid password",
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match!" : null,
    },
  });

  const registerUser = () => {};

  return (
    <Container>
      <Center style={{ width: "100%", height: "95vh" }}>
        <Paper shadow="md" p="sm" sx={{ width: "300px" }}>
          <form onSubmit={registerForm.onSubmit((values) => registerUser())}>
            <Stack spacing="md">
              <TextInput
                required
                label="Username"
                placeholder="Username"
                {...registerForm.getInputProps("usrename")}
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
  );
};

Register.getLayout = (page: ReactElement) => <PageLayout>{page}</PageLayout>;
export default Register;
