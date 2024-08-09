import { useEffect, useState } from "react";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LoginUser } from "../gql/auth";

import { LoginSchema } from "@renderer/ValidationSchemas";
import { Form, Formik } from "formik";
import { Button, Input, TextInput } from "@mantine/core";

const LoginPage = () => {
    const navigate = useNavigate();

    const { isLoggedIn, login } = useAuth();

    const [unsuccesful, setUnsuccesful] = useState(false);

    useEffect(() => {
        if (isLoggedIn) navigate("/");
    }, [isLoggedIn]);

    const [loginUser] = useMutation(LoginUser, {
        update: (_, { data: { loginUser: userData } = {} }) => {
            login(userData);
        },
        onError: () => {
            setUnsuccesful(true);
        }
    });

    if (isLoggedIn) return <></>;

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col justify-center p-10 items-center w-[500px] rounded-xl bg-neutral-700/[0.05] border border-blue-500/60">
                <div className="flex text-xl">
                    <span>Login to&nbsp;</span>
                    <span className="font-bold">Fluffer</span>
                </div>
                <div className="flex flex-col justify-center items-center w-full">
                    <Formik
                        initialValues={{
                            usernameOrEmail: "",
                            password: ""
                        }}
                        validationSchema={LoginSchema}
                        onSubmit={(values) => loginUser({ variables: values })}
                    >
                        {({ errors, handleChange, touched, values }) => (
                            <Form className="w-full">
                                <div className="flex flex-col justify-center items-center pt-8 px-8 py-4 gap-2 w-full">
                                    <div className="flex flex-col gap-1 w-full">
                                        <Input.Label
                                            required
                                            size="md"
                                            htmlFor="usernameOrEmail"
                                        >
                                            Username or Email
                                        </Input.Label>
                                        <TextInput
                                            id="usernameOrEmail"
                                            name="usernameOrEmail"
                                            onChange={handleChange}
                                            autoComplete="off"
                                            error={
                                                !!errors.usernameOrEmail &&
                                                touched.usernameOrEmail
                                            }
                                            value={values.usernameOrEmail}
                                            required
                                            type="text"
                                        />
                                        {errors.usernameOrEmail && (
                                            <Input.Error>
                                                {errors.usernameOrEmail}
                                            </Input.Error>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <Input.Label
                                            required
                                            htmlFor="password"
                                            size="md"
                                        >
                                            Password
                                        </Input.Label>
                                        <TextInput
                                            id="password"
                                            name="password"
                                            type="password"
                                            onChange={handleChange}
                                            error={
                                                (!!errors.password &&
                                                    touched.password) ||
                                                unsuccesful
                                            }
                                            value={values.password}
                                            required
                                        />
                                        {errors.password && (
                                            <Input.Error>
                                                {errors.password}
                                            </Input.Error>
                                        )}
                                        {unsuccesful && (
                                            <Input.Error>
                                                Invalid username or password
                                            </Input.Error>
                                        )}
                                    </div>
                                    <div className="flex flex-col mt-2 gap-2">
                                        <Button
                                            size="md"
                                            color="green"
                                            type="submit"
                                        >
                                            Login
                                        </Button>
                                        <Button
                                            variant="transparent"
                                            onClick={() =>
                                                navigate("/register")
                                            }
                                        >
                                            Don't have an account? Register
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center"></div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

/*<Field
                            name="usernameOrEmail"
                            label="Username or Email"
                            error={errors.username || errors.email}
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
*/
