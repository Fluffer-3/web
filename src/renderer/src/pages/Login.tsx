import { FormEvent, useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LoginUser } from "../gql/auth";

import { Button, Container, Form, HStack, Input, Text, VStack } from "rsuite";
import { LoginSchema } from "@renderer/ValidationSchemas";
import Field from "@renderer/components/Field";

const LoginPage = () => {
    const formRef = useRef<any>();
    const navigate = useNavigate();

    const { isLoggedIn, login } = useAuth();

    useEffect(() => {
        if (isLoggedIn) navigate("/");
    }, [isLoggedIn]);

    const [creds, setCreds] = useState<Record<string, string>>({
        usernameOrEmail: "",
        password: ""
    });

    const [errors, setErrors] = useState<Record<string, string | null>>({
        username: null,
        email: null,
        password: null
    });

    const [loginUser] = useMutation(LoginUser, {
        update: (_, { data: { loginUser: userData } = {} }) => {
            setErrors({
                email: null,
                password: null,
                username: null
            });

            setCreds({ usernameOrEmail: "", password: "" });

            login(userData);
        },
        onError: (error) => {
            const errs = error.graphQLErrors[0].extensions.errors as any[];
            errs.forEach((err) => {
                setErrors((prev) => ({
                    ...prev,
                    [err.type]: err.message
                }));
            });
        },
        variables: creds
    });

    if (isLoggedIn) return <></>;

    const onChange = (formValue: Record<string, string>) => {
        setCreds(formValue);
    };

    const onSubmit = (e?: FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        loginUser();
    };

    return (
        <VStack
            className="h-screen"
            alignItems="center"
            justifyContent="center"
        >
            <HStack>
                <Text size="xxl">Login to</Text>
                <Text size="xxl" weight="extrabold" className="text-primary">
                    Fluffer
                </Text>
            </HStack>
            <VStack
                className="p-10 shadow-2xl rounded-lg bg-neutral-700/[.05]"
                alignItems="center"
                justifyContent="center"
            >
                <Container>
                    <Form
                        ref={formRef}
                        onChange={onChange}
                        onCheck={setErrors}
                        formValue={creds}
                        model={LoginSchema}
                        onSubmit={(_, e) => onSubmit(e)}
                    >
                        <Field
                            name="usernameOrEmail"
                            label="Username or Email"
                            error={errors.username || errors.email}
                            acceptor={Input}
                            size="lg"
                            required
                        />
                        <Field
                            name="password"
                            label="Password"
                            error={errors.password}
                            acceptor={Input}
                            autocomplete="off"
                            type="password"
                            size="lg"
                            required
                        />
                        <Button
                            appearance="primary"
                            color="green"
                            type="submit"
                            size="lg"
                            block
                        >
                            Login
                        </Button>
                    </Form>
                </Container>
                <Container>
                    <Button
                        appearance="link"
                        onClick={() => navigate("/register")}
                        size="lg"
                    >
                        Don't have an account? Register
                    </Button>
                </Container>
            </VStack>
        </VStack>
    );
};

export default LoginPage;
