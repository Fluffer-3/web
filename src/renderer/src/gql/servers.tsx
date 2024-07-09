import { gql } from "@apollo/client";

export const CreateServer = gql`
    mutation createServer($name: String!, $icon: Upload) {
        createServer(name: $name, icon: $icon) {
            id
            name
            nameAcronym
            icon
        }
    }
`;
