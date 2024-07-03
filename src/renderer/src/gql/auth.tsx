import { gql } from "@apollo/client";

export const LoginUser = gql`
    mutation loginUser($usernameOrEmail: String!, $password: String!) {
        loginUser(
            input: { usernameOrEmail: $usernameOrEmail, password: $password }
        ) {
            token
            id
            username
            email
            avatar
            nickname
            bio
            createdAt
            createdTimestamp
            updatedAt
            updatedTimestamp
        }
    }
`;

export const RegisterUser = gql`
    mutation registerUser(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        registerUser(
            input: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        )
    }
`;
