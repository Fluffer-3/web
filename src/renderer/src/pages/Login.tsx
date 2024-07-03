import { useEffect, useState } from "react";
import { useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LoginUser } from "../gql/auth";

import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { LoginCredentials, LoginErrors } from "@renderer/@types";

const LoginPage = () => {
    const navigate = useNavigate();

    const { isLoggedIn, login } = useAuth();

    useEffect(() => {
        if (isLoggedIn) navigate("/");
    }, [isLoggedIn]);

    const [creds, setCreds] = useState<LoginCredentials>({
        usernameOrEmail: "",
        password: ""
    });

    const [errors, setErrors] = useState<LoginErrors>({
        general: null,
        username: null,
        email: null,
        password: null
    });

    const [loginUser] = useMutation(LoginUser, {
        update: (_, { data: { loginUser: userData } = {} }) => {
            setErrors({
                general: null,
                email: null,
                password: null,
                username: null
            });

            setCreds({ usernameOrEmail: "", password: "" });

            login(userData);
        },
        onError: (error) => {
            const errs = error.graphQLErrors[0].extensions.errors as any[];
            console.log(errs);
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

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCreds({ ...creds, [e.target.name]: e.target.value });
    };

    return (
        <div
            className="flex h-screen justify-center"
            onKeyDown={(e) => {
                if (e.key === "Enter") loginUser();
            }}
        >
            <div className="inline-flex flex-col m-auto p-10 justify-center items-center gap-10 m-auto shadow-2xl rounded-lg bg-neutral-700/[.05]">
                <div>
                    <span className="text-lg">Login to&nbsp;</span>
                    <span className="text-lg font-bold">Fluffer</span>
                </div>
                {errors.general && (
                    <span className="text-red-500 text-sm">
                        {errors.general}
                    </span>
                )}
                <div className="flex flex-col gap-4 items-center justify-center">
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <FloatLabel>
                            <InputText
                                id="usernameOrEmail"
                                name="usernameOrEmail"
                                onChange={onChange}
                                value={creds.usernameOrEmail}
                                invalid={!!errors.username || !!errors.email}
                            />
                            <label htmlFor="usernameOrEmail">
                                Username/Email
                            </label>
                        </FloatLabel>
                        {(errors.username || errors.email) && (
                            <span className="text-red-500 text-sm">
                                {errors.username || errors.email}
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
                                feedback={false}
                                invalid={!!errors.password}
                            />
                            <label htmlFor="password">Password</label>
                        </FloatLabel>
                        {errors.password && (
                            <span className="text-red-500 text-sm">
                                {errors.password}
                            </span>
                        )}
                    </div>
                </div>
                <div className="footer">
                    <Button
                        label="Submit"
                        onClick={() => loginUser()}
                        className="w-full"
                        severity="success"
                    />
                    <p className="text-sm text-center mt-5">
                        Don't have an account?{" "}
                        <p
                            className="text-blue-400 m-2 cursor-pointer"
                            onClick={() => navigate("/register")}
                        >
                            Sign up
                        </p>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
