import { useEffect, useState } from "react";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { RegisterUser } from "../gql/auth";
import { Button } from "primereact/button";
import { Form, Formik } from "formik";
import { RegisterSchema } from "@renderer/ValidationSchemas";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";

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
            const errs = error.graphQLErrors[0].extensions.errors as any[];
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
            <div className="flex flex-col justify-center p-10 items-center w-[500px] rounded-xl bg-neutral-700/[0.05]">
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
                                        <label htmlFor="email">
                                            Email{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <InputText
                                            id="email"
                                            name="email"
                                            onChange={handleChange}
                                            autoComplete="off"
                                            className="p-2 w-full border border-neutral-400 rounded-md"
                                            type="text"
                                            required
                                            value={values.email}
                                        />
                                        {errors.email && touched.email && (
                                            <div className="text-red-500">
                                                {errors.email}
                                            </div>
                                        )}
                                        {serverErrors.email && (
                                            <div className="text-red-500">
                                                {serverErrors.email}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <label htmlFor="username">
                                            Username{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <InputText
                                            id="username"
                                            name="username"
                                            onChange={handleChange}
                                            autoComplete="off"
                                            className="p-2 w-full border border-neutral-400 rounded-md"
                                            type="text"
                                            required
                                            value={values.username}
                                        />
                                        {errors.username &&
                                            touched.username && (
                                                <div className="text-red-500">
                                                    {errors.username}
                                                </div>
                                            )}
                                        {serverErrors.username && (
                                            <div className="text-red-500">
                                                {serverErrors.username}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <label htmlFor="displayName">
                                            Display Name
                                        </label>
                                        <InputText
                                            id="displayName"
                                            name="displayName"
                                            onChange={handleChange}
                                            autoComplete="off"
                                            className="p-2 w-full border border-neutral-400 rounded-md"
                                            type="text"
                                        />
                                        {errors.displayName &&
                                            touched.displayName && (
                                                <div className="text-red-500">
                                                    {errors.displayName}
                                                </div>
                                            )}
                                        {serverErrors.displayName && (
                                            <div className="text-red-500">
                                                {serverErrors.displayName}
                                            </div>
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
                                            type="password"
                                            onChange={handleChange}
                                            className="p-2 w-full border border-neutral-400 rounded-md"
                                            required
                                        />
                                        {errors.password &&
                                            touched.password && (
                                                <div className="text-red-500">
                                                    {errors.password}
                                                </div>
                                            )}
                                        {serverErrors.password && (
                                            <div className="text-red-500">
                                                {serverErrors.password}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <label htmlFor="confirmPassword">
                                            Confirm Password{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <InputText
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type="password"
                                            onChange={handleChange}
                                            className="p-2 w-full border border-neutral-400 rounded-md"
                                            required
                                        />
                                        {errors.confirmPassword &&
                                            touched.confirmPassword && (
                                                <div className="text-red-500">
                                                    {errors.confirmPassword}
                                                </div>
                                            )}
                                        {serverErrors.confirmPassword && (
                                            <div className="text-red-500">
                                                {serverErrors.confirmPassword}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <label htmlFor="dateOfBirth">
                                            Date of Birth{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <InputMask
                                            id="dateOfBirth"
                                            name="dateOfBirth"
                                            onChange={handleChange}
                                            className="p-2 w-full border border-neutral-400 rounded-md"
                                            mask="99/99/9999"
                                            slotChar="dd/mm/yyyy"
                                            placeholder="dd/mm/yyyy"
                                            value={values.dateOfBirth}
                                            required
                                        />
                                        {errors.dateOfBirth &&
                                            touched.dateOfBirth && (
                                                <div className="text-red-500">
                                                    {errors.dateOfBirth}
                                                </div>
                                            )}
                                        {serverErrors.dateOfBirth && (
                                            <div className="text-red-500">
                                                {serverErrors.dateOfBirth}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col mt-2 gap-2">
                                        <Button
                                            type="submit"
                                            label="Register"
                                            severity="success"
                                            className="w-full"
                                        />
                                        <Button
                                            onClick={() => navigate("/login")}
                                            label="Already have an account? Login"
                                            severity="info"
                                            link
                                            className="w-full"
                                        />
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
