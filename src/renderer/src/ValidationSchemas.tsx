import { sub } from "date-fns";
import { date, object, string, mixed, ref } from "yup";

const pswdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export const LoginSchema = object().shape({
    usernameOrEmail: string()
        .required("Username or email is required")
        .min(4, "Username or email must be at least 4 characters")
        .max(30, "Username or email must be at most 30 characters"),
    password: string().required("Password is required")
});

export const RegisterSchema = object().shape({
    email: string()
        .email("Email must be a valid email address")
        .required("Email is required"),
    username: string()
        .min(4, "Username must be at least 4 characters")
        .max(30, "Username must be at most 30 characters")
        .required("Username is required"),
    displayName: string().nullable(),
    password: string()
        .matches(pswdRegex, "Password must be a valid password")
        .required("Password is required"),
    confirmPassword: string()
        .matches(pswdRegex, "Confirm password must be a valid password")
        .required("Confirm password is required")
        .when("password", {
            is: (val: string) => val !== "",
            then: (schema) =>
                schema
                    .required()
                    .oneOf([ref("password")], "Passwords must match")
        }),
    dateOfBirth: date()
        .nonNullable()
        .required()
        .transform((value) => new Date(value))
        .typeError("Date of birth is required")
        .max(
            sub(new Date(), { years: 13 }),
            "You must be at least 13 years old"
        )
});

export const CreateServerSchema = object().shape({
    name: string()
        .min(4, "Server name must be at least 4 characters")
        .max(30, "Server name must be at most 30 characters")
        .required("Server name is required"),
    icon: mixed().nullable()
});
