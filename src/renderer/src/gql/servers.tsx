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

export const GetUserServers = gql`
    query getUserServers($id: String) {
        getUserServers(id: $id) {
            id
            name
            nameAcronym
            icon
            owner {
                id
            }
        }
    }
`;

export const GetServerSidebarInfo = gql`
    query getServerSidebarInfo($id: String!) {
        getServer(id: $id) {
            id
            name
            nameAcronym
            icon
        }
    }
`;

export const OnServerCreated = gql`
    subscription serverCreated {
        serverCreated {
            id
            name
            nameAcronym
            icon
        }
    }
`;
