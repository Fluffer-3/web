import { Schema } from "rsuite";

const { StringType } = Schema.Types;

const pswdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export const LoginSchema = Schema.Model({
    usernameOrEmail: StringType()
        .isRequired("Username or email is required")
        .minLength(4, "Username or email must be at least 4 characters")
        .maxLength(30, "Username or email must be at most 30 characters"),
    password: StringType().isRequired("Password is required")
});

export const RegisterSchema = Schema.Model({
    email: StringType()
        .isEmail("Email must be a valid email address")
        .isRequired("Email is required"),
    username: StringType()
        .minLength(4, "Username must be at least 4 characters")
        .maxLength(30, "Username must be at most 30 characters")
        .isRequired("Username is required"),
    displayName: StringType(),
    password: StringType()
        .pattern(pswdRegex, "Password must be a valid password")
        .isRequired("Password is required"),
    confirmPassword: StringType()
        .pattern(pswdRegex, "Confirm password must be a valid password")
        .isRequired("Confirm password is required")
        .addRule((value, data) => {
            if (value !== data.password) {
                return false;
            }
            return true;
        }, "Password must match confirm password")
});

export const CreateServerSchema = Schema.Model({
    name: StringType()
        .minLength(4, "Server name must be at least 4 characters")
        .maxLength(30, "Server name must be at most 30 characters")
        .isRequired("Server name is required")
});
