import { useEffect, useState } from "react";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { RegisterUser } from "../gql/auth";

import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { RegisterCredentials, RegisterErrors } from "@renderer/@types";

const RegisterPage = () => {
    const navigate = useNavigate();

    const { isLoggedIn } = useAuth();

    useEffect(() => {
        if (isLoggedIn) navigate("/");
    }, [isLoggedIn]);

    const [creds, setCreds] = useState<RegisterCredentials>({
        email: "",
        username: "",
        displayName: null,
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState<RegisterErrors>({
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
            console.log(error);
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

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCreds({ ...creds, [e.target.name]: e.target.value });
    };

    const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setErrors((prev) => ({
            ...prev,
            [e.target.name]: null
        }));
    };

    const passwordHeader = (
        <div className="font-bold mb-3">Pick a password</div>
    );

    const passwordFooter = (
        <>
            <Divider />
            <p className="font-bold mt-2">For a good password, you can use</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li>At least one uppercase letter</li>
                <li>At least one lowercase letter</li>
                <li>At least one number</li>
                <li>At least one special character</li>
                <li>Minimum 8 characters</li>
            </ul>
        </>
    );

    if (isLoggedIn) return <></>;

    return (
        <div
            className="flex h-screen justify-center"
            onKeyDown={(e) => {
                if (e.key === "Enter") registerUser();
            }}
        >
            <div className="inline-flex flex-col m-auto p-10 justify-center items-center gap-10 m-auto shadow-2xl rounded-lg bg-neutral-700/[.05]">
                <div className="header p-2">
                    {!successful && (
                        <>
                            <span className="text-lg">Signup for&nbsp;</span>
                            <span className="text-lg font-bold">Fluffer</span>
                        </>
                    )}
                </div>
                {successful ? (
                    <span className="text-green-500 text-center">
                        Account created successfully
                    </span>
                ) : (
                    <div className="flex flex-col gap-8 items-center justify-center">
                        <div className="flex flex-col gap-2 items-center justify-center">
                            <FloatLabel>
                                <InputText
                                    id="email"
                                    name="email"
                                    onChange={onChange}
                                    placeholder="Enter your email"
                                    value={creds.email}
                                    invalid={!!errors.email}
                                    onFocus={onFocus}
                                />
                                <label htmlFor="email">
                                    Email{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                            </FloatLabel>
                            {errors.email && (
                                <span className="text-red-500 text-center text-sm">
                                    {errors.email}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 items-center justify-center">
                            <FloatLabel>
                                <InputText
                                    id="username"
                                    name="username"
                                    onChange={onChange}
                                    value={creds.username}
                                    invalid={!!errors.username}
                                    placeholder="Enter your username"
                                    onFocus={onFocus}
                                />
                                <label htmlFor="username">
                                    Username{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                            </FloatLabel>
                            {errors.username && (
                                <span className="text-red-500 text-center text-sm">
                                    {errors.username}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 items-center justify-center">
                            <FloatLabel>
                                <InputText
                                    id="displayName"
                                    name="displayName"
                                    onChange={onChange}
                                    value={creds.displayName ?? ""}
                                    invalid={!!errors.displayName}
                                    placeholder="Enter your display name"
                                    onFocus={onFocus}
                                />
                                <label htmlFor="displayName">
                                    Display Name
                                </label>
                            </FloatLabel>
                            {errors.displayName && (
                                <span className="text-red-500 text-center text-sm">
                                    {errors.displayName}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 items-center justify-center">
                            <FloatLabel>
                                <Password
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={onChange}
                                    value={creds.password}
                                    header={passwordHeader}
                                    footer={passwordFooter}
                                    invalid={!!errors.password}
                                    onFocus={onFocus}
                                />
                                <label htmlFor="password">
                                    Password{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                            </FloatLabel>
                            {errors.password && (
                                <span className="text-red-500 text-center text-sm">
                                    {errors.password}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 items-center justify-center">
                            <FloatLabel>
                                <Password
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="confirmPassword"
                                    onChange={onChange}
                                    value={creds.confirmPassword}
                                    feedback={false}
                                    invalid={!!errors.confirmPassword}
                                    onFocus={onFocus}
                                />
                                <label htmlFor="confirmPassword">
                                    Confirm Password{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                            </FloatLabel>
                            {errors.confirmPassword && (
                                <span className="text-red-500 text-center text-sm">
                                    {errors.confirmPassword}
                                </span>
                            )}
                        </div>
                    </div>
                )}
                <div className="footer">
                    {successful ? (
                        <Button
                            label="Login"
                            onClick={() => navigate("/login")}
                            className="w-full"
                            severity="success"
                        />
                    ) : (
                        <>
                            <Button
                                label="Submit"
                                onClick={() => registerUser()}
                                className="w-full"
                                severity="success"
                            />
                            <p className="text-sm text-center mt-5">
                                Already have an account?{" "}
                                <p
                                    className="text-blue-400 m-2 cursor-pointer"
                                    onClick={() => navigate("/login")}
                                >
                                    Login
                                </p>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
