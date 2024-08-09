import { useEffect, useState } from "react";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { RegisterUser } from "../gql/auth";
import { Form, Formik } from "formik";
import { RegisterSchema } from "@renderer/ValidationSchemas";
import { Button, Input, TextInput } from "@mantine/core";

const RegisterPage = () => {
    const navigate = useNavigate();

    const { isLoggedIn } = useAuth();

    useEffect(() => {
        if (isLoggedIn) navigate("/");
    }, [isLoggedIn]);

    const [successful, setSuccessful] = useState(false);

    const [serverErrors, setServerErrors] = useState<
        Record<string, string | null>
    >({
        email: null,
        username: null,
        displayName: null,
        password: null,
        confirmPassword: null,
        dateOfBirth: null
    });

    const [registerUser] = useMutation(RegisterUser, {
        update: () => {
            setSuccessful(true);
        },
        onError: (error) => {
            const errs = error.graphQLErrors[0].extensions?.errors as any[];
            if (errs) {
                errs.forEach((e) => {
                    setServerErrors((prev) => ({
                        ...prev,
                        [e.type]: e.message
                    }));
                });
            }
        }
    });

    if (isLoggedIn) return <></>;

    if (successful)
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="flex flex-col justify-center items-center p-10 shadow-2xl rounded-lg bg-neutral-700/[.05]">
                    <div className="flex">
                        <span>Account was created successfully</span>
                    </div>
                    <div className="container">
                        <Button
                            color="green"
                            size="lg"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        );

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex flex-col justify-center p-10 items-center w-[500px] rounded-xl bg-neutral-700/[0.05] border border-blue-500/60">
                <div className="flex font-bold text-xl">
                    <span>Create an account</span>
                </div>
                <div className="flex flex-col justify-center items-center w-full">
                    <Formik
                        initialValues={{
                            email: "",
                            username: "",
                            displayName: null,
                            password: "",
                            confirmPassword: "",
                            dateOfBirth: ""
                        }}
                        validationSchema={RegisterSchema}
                        onSubmit={(values) =>
                            registerUser({ variables: values })
                        }
                    >
                        {({ errors, handleChange, touched, values }) => (
                            <Form className="w-full">
                                <div className="flex flex-col justify-center items-center pt-8 px-8 py-4 gap-2 w-full">
                                    <div className="flex flex-col gap-1 w-full">
                                        <Input.Label
                                            size="lg"
                                            required
                                            htmlFor="email"
                                        >
                                            Email{" "}
                                        </Input.Label>
                                        <TextInput
                                            id="email"
                                            name="email"
                                            onChange={handleChange}
                                            autoComplete="off"
                                            error={
                                                (!!errors.email ||
                                                    !!serverErrors.email) &&
                                                touched.email
                                            }
                                            type="text"
                                            required
                                            value={values.email}
                                        />
                                        {errors.email && touched.email && (
                                            <Input.Error>
                                                {errors.email}
                                            </Input.Error>
                                        )}
                                        {serverErrors.email && (
                                            <Input.Error>
                                                {serverErrors.email}
                                            </Input.Error>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <Input.Label
                                            size="lg"
                                            required
                                            htmlFor="username"
                                        >
                                            Username
                                        </Input.Label>
                                        <TextInput
                                            id="username"
                                            name="username"
                                            onChange={handleChange}
                                            autoComplete="off"
                                            type="text"
                                            error={
                                                (!!errors.username ||
                                                    !!serverErrors.username) &&
                                                touched.username
                                            }
                                            required
                                            value={values.username}
                                        />
                                        {errors.username &&
                                            touched.username && (
                                                <Input.Error>
                                                    {errors.username}
                                                </Input.Error>
                                            )}
                                        {serverErrors.username && (
                                            <Input.Error>
                                                {serverErrors.username}
                                            </Input.Error>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <Input.Label
                                            size="lg"
                                            htmlFor="displayName"
                                        >
                                            Display Name
                                        </Input.Label>
                                        <TextInput
                                            id="displayName"
                                            name="displayName"
                                            onChange={handleChange}
                                            autoComplete="off"
                                            error={
                                                (!!errors.displayName ||
                                                    !!serverErrors.displayName) &&
                                                touched.displayName
                                            }
                                            type="text"
                                            value={values.displayName ?? ""}
                                        />
                                        {errors.displayName &&
                                            touched.displayName && (
                                                <Input.Error>
                                                    {errors.displayName}
                                                </Input.Error>
                                            )}
                                        {serverErrors.displayName && (
                                            <Input.Error>
                                                {serverErrors.displayName}
                                            </Input.Error>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <Input.Label
                                            size="lg"
                                            required
                                            htmlFor="password"
                                        >
                                            Password
                                        </Input.Label>
                                        <TextInput
                                            id="password"
                                            name="password"
                                            type="password"
                                            error={
                                                (!!errors.password ||
                                                    !!serverErrors.password) &&
                                                touched.password
                                            }
                                            onChange={handleChange}
                                            required
                                            value={values.password}
                                        />
                                        {errors.password &&
                                            touched.password && (
                                                <Input.Error>
                                                    {errors.password}
                                                </Input.Error>
                                            )}
                                        {serverErrors.password && (
                                            <Input.Error>
                                                {serverErrors.password}
                                            </Input.Error>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <Input.Label
                                            size="lg"
                                            required
                                            htmlFor="confirmPassword"
                                        >
                                            Confirm Password
                                        </Input.Label>
                                        <TextInput
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            error={
                                                (!!errors.confirmPassword ||
                                                    !!serverErrors.confirmPassword) &&
                                                touched.confirmPassword
                                            }
                                            onChange={handleChange}
                                            required
                                            value={values.confirmPassword}
                                        />
                                        {errors.confirmPassword &&
                                            touched.confirmPassword && (
                                                <Input.Error>
                                                    {errors.confirmPassword}
                                                </Input.Error>
                                            )}
                                        {serverErrors.confirmPassword && (
                                            <Input.Error>
                                                {serverErrors.confirmPassword}
                                            </Input.Error>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <Input.Label
                                            size="lg"
                                            required
                                            htmlFor="dateOfBirth"
                                        >
                                            Date of Birth
                                        </Input.Label>
                                        <TextInput
                                            id="dateOfBirth"
                                            name="dateOfBirth"
                                            error={
                                                (!!errors.dateOfBirth ||
                                                    !!serverErrors.dateOfBirth) &&
                                                touched.dateOfBirth
                                            }
                                            onChange={handleChange}
                                            value={values.dateOfBirth}
                                            required
                                        />
                                        {errors.dateOfBirth &&
                                            touched.dateOfBirth && (
                                                <Input.Error>
                                                    {errors.dateOfBirth}
                                                </Input.Error>
                                            )}
                                        {serverErrors.dateOfBirth && (
                                            <Input.Error>
                                                {serverErrors.dateOfBirth}
                                            </Input.Error>
                                        )}
                                    </div>
                                    <div className="flex flex-col mt-2 gap-2">
                                        <Button
                                            type="submit"
                                            size="md"
                                            color="green"
                                        >
                                            Register
                                        </Button>
                                        <Button
                                            onClick={() => navigate("/login")}
                                            variant="transparent"
                                        >
                                            Already have an account? Login
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;

/**
 * <Field
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
 */
