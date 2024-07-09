import { useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { RegisterUser } from "../gql/auth";

import { Button, Container, Form, HStack, Input, Text, VStack } from "rsuite";
import { RegisterSchema } from "../ValidationSchemas";

import Field from "@renderer/components/Field";

const RegisterPage = () => {
    const navigate = useNavigate();
    const formRef = useRef<any>();

    const { isLoggedIn } = useAuth();

    useEffect(() => {
        if (isLoggedIn) navigate("/");
    }, [isLoggedIn]);

    const [creds, setCreds] = useState<Record<string, string | null>>({
        email: "",
        username: "",
        displayName: null,
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState<Record<string, string | null>>({
        email: null,
        username: null,
        displayName: null,
        password: null,
        confirmPassword: null
    });

    const [successful, setSuccessful] = useState(false);

    const [registerUser] = useMutation(RegisterUser, {
        update: () => {
            setErrors({
                email: "",
                username: "",
                displayName: null,
                password: "",
                confirmPassword: ""
            });

            setSuccessful(true);
        },
        onError: (error) => {
            const errs = error.graphQLErrors[0].extensions.errors as any[];
            if (!errs) return;
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

    const onChange = (formValue: Record<string, any>) => {
        setCreds(formValue);
    };

    const onsubmit = (e?: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        registerUser();
    };

    if (successful)
        return (
            <VStack
                className="h-screen"
                alignItems="center"
                justifyContent="center"
            >
                <VStack
                    className="p-10 shadow-2xl rounded-lg bg-neutral-700/[.05]"
                    justifyContent="center"
                    alignItems="center"
                    spacing={30}
                >
                    <HStack>
                        <Text size="xxl" color="green">
                            Account was created successfully
                        </Text>
                    </HStack>
                    <Container>
                        <Button
                            appearance="primary"
                            block
                            size="lg"
                            color="green"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </Button>
                    </Container>
                </VStack>
            </VStack>
        );

    return (
        <VStack
            className="h-screen"
            alignItems="center"
            justifyContent="center"
        >
            <HStack>
                <Text size="xxl">Register</Text>
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
                        formError={errors}
                        model={RegisterSchema}
                        onSubmit={(_, e) => onsubmit(e)}
                        autoComplete="off"
                    >
                        <Field
                            name="email"
                            label="Email"
                            acceptor={Input}
                            required
                        />
                        <Field
                            name="username"
                            label="Username"
                            acceptor={Input}
                            required
                        />
                        <Field
                            name="displayName"
                            label="Display Name"
                            acceptor={Input}
                        />
                        <Field
                            name="password"
                            label="Password"
                            type="password"
                            acceptor={Input}
                            required
                        />
                        <Field
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            acceptor={Input}
                            required
                        />
                        <Button
                            appearance="primary"
                            block
                            size="lg"
                            color="green"
                            type="submit"
                        >
                            Register
                        </Button>
                    </Form>
                </Container>
                <Container>
                    <Button
                        appearance="link"
                        onClick={() => navigate("/login")}
                        size="lg"
                    >
                        Already have an account? Login
                    </Button>
                </Container>
            </VStack>
        </VStack>
    );
};

export default RegisterPage;
