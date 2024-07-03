import { useEffect, useState } from "react";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SignupUser } from "../gql/auth";

import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { SignupCredentials, SignupErrors } from "@renderer/@types";
import { Calendar } from "primereact/calendar";

const SignUpPage = () => {
    const navigate = useNavigate();

    const { isLoggedIn } = useAuth();

    useEffect(() => {
        if (isLoggedIn) navigate("/");
    }, [isLoggedIn]);

    const [creds, setCreds] = useState<SignupCredentials>({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        dateOfBirth: null
    });

    const [errors, setErrors] = useState<SignupErrors>({
        email: null,
        username: null,
        password: null,
        confirmPassword: null,
        dateOfBirth: null
    });

    const [successful, setSuccessful] = useState(false);

    const [signupUser] = useMutation(SignupUser, {
        update: () => {
            setErrors({
                email: null,
                username: null,
                password: null,
                confirmPassword: null
            });

            setSuccessful(true);
        },
        onError: (error) => {
            // TODO: Come up with a better way to handle errors.
            const message = error.message.toLowerCase();
            if (message.includes("email")) {
                setErrors({
                    email: error.message,
                    username: null,
                    password: null,
                    confirmPassword: null,
                    dateOfBirth: null
                });
            }

            if (message.includes("username")) {
                setErrors({
                    email: null,
                    username: error.message,
                    password: null,
                    confirmPassword: null,
                    dateOfBirth: null
                });
            }

            if (message.includes("password")) {
                setErrors({
                    email: null,
                    username: null,
                    password: error.message,
                    confirmPassword: null,
                    dateOfBirth: null
                });
            }

            if (message.includes("confirm")) {
                setErrors({
                    email: null,
                    username: null,
                    password: null,
                    confirmPassword: error.message,
                    dateOfBirth: null
                });
            }

            if (message.includes("date") || message.includes("13")) {
                setErrors({
                    email: null,
                    username: null,
                    password: null,
                    confirmPassword: null,
                    dateOfBirth: error.message
                });
            }
        },
        variables: creds
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCreds({ ...creds, [e.target.name]: e.target.value });
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
        <div className="flex h-screen justify-center">
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
                        <div className="form-field">
                            <FloatLabel>
                                <InputText
                                    id="email"
                                    name="email"
                                    onChange={onChange}
                                    value={creds.email}
                                />
                                <label htmlFor="email">Email</label>
                            </FloatLabel>
                            <span className="text-red-500 text-sm">
                                {errors.email}
                            </span>
                        </div>
                        <div className="form-field">
                            <FloatLabel>
                                <InputText
                                    id="username"
                                    name="username"
                                    onChange={onChange}
                                    value={creds.username}
                                />
                                <label htmlFor="username">Username</label>
                            </FloatLabel>
                            <span className="text-red-500 text-sm">
                                {errors.username}
                            </span>
                        </div>
                        <div className="form-field">
                            <FloatLabel>
                                <Password
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={onChange}
                                    value={creds.password}
                                    header={passwordHeader}
                                    footer={passwordFooter}
                                    toggleMask
                                    size={18}
                                />
                                <label htmlFor="password">Password</label>
                            </FloatLabel>
                            {errors.password && (
                                <span className="text-red-500 text-sm">
                                    {errors.password}
                                </span>
                            )}
                        </div>
                        <div className="form-field">
                            <FloatLabel>
                                <Password
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="confirmPassword"
                                    onChange={onChange}
                                    value={creds.confirmPassword}
                                    toggleMask
                                    feedback={false}
                                    variant="outlined"
                                    size={18}
                                />
                                <label htmlFor="confirmPassword">
                                    Confirm Password
                                </label>
                            </FloatLabel>
                            {errors.confirmPassword && (
                                <span className="text-red-500 text-sm">
                                    {errors.confirmPassword}
                                </span>
                            )}
                        </div>
                        <div className="form-field">
                            <FloatLabel>
                                <Calendar
                                    inputId="dateOfBirth"
                                    value={creds.dateOfBirth}
                                    onChange={(e) =>
                                        setCreds({
                                            ...creds,
                                            dateOfBirth: e.value
                                        })
                                    }
                                    maxDate={
                                        new Date(
                                            new Date().setFullYear(
                                                new Date().getFullYear() - 13
                                            )
                                        )
                                    }
                                />
                                <label htmlFor="dateOfBirth">
                                    Date of Birth
                                </label>
                            </FloatLabel>
                            {errors.dateOfBirth && (
                                <span className="text-red-500 text-sm">
                                    {errors.dateOfBirth}
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
                                onClick={() => signupUser()}
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

export default SignUpPage;
