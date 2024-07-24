import { useEffect, useState } from "react";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LoginUser } from "../gql/auth";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { LoginSchema } from "@renderer/ValidationSchemas";
import { Form, Formik } from "formik";
import { Password } from "primereact/password";

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
            <div className="flex flex-col justify-center p-10 items-center w-[500px] rounded-xl bg-neutral-700/[0.05]">
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
                                        <label htmlFor="usernameOrEmail">
                                            Username or Email{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <InputText
                                            id="usernameOrEmail"
                                            name="usernameOrEmail"
                                            onChange={handleChange}
                                            autoComplete="off"
                                            invalid={
                                                !!errors.usernameOrEmail &&
                                                touched.usernameOrEmail
                                            }
                                            value={values.usernameOrEmail}
                                            required
                                            type="text"
                                        />
                                        {errors.usernameOrEmail && (
                                            <small className="text-red-500 text-xs">
                                                {errors.usernameOrEmail}
                                            </small>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <label htmlFor="password">
                                            Password{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <InputText
                                            id="password"
                                            name="password"
                                            toggleMask
                                            type="password"
                                            onChange={handleChange}
                                            invalid={
                                                (!!errors.password &&
                                                    touched.password) ||
                                                unsuccesful
                                            }
                                            value={values.password}
                                            required
                                        />
                                        {errors.password && (
                                            <small className="text-red-500 text-xs">
                                                {errors.password}
                                            </small>
                                        )}
                                        {unsuccesful && (
                                            <small className="text-red-500 text-xs">
                                                Invalid username or password
                                            </small>
                                        )}
                                    </div>
                                    <div className="flex flex-col mt-2 gap-2">
                                        <Button
                                            type="submit"
                                            label="Login"
                                            severity="success"
                                            className="w-full"
                                        />
                                        <Button
                                            link
                                            onClick={() =>
                                                navigate("/register")
                                            }
                                            label="Don't have an account? Register"
                                        />
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
