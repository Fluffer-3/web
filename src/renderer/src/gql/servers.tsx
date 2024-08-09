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

export const JoinServer = gql`
    mutation joinServer($code: String!) {
        joinServer(code: $code) {
            id
            name
            nameAcronym
            icon
        }
    }
`;

export const LeaveServer = gql`
    mutation leaveServer($id: String!) {
        leaveServer(id: $id)
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

export const CheckServerAccess = gql`
    query checkServerAccess($id: String!) {
        checkServerAccess(id: $id)
    }
`;

export const GetServerSidebarInfo = gql`
    query getServerSidebarInfo($id: String!) {
        getServer(id: $id) {
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

export const GetServerInvites = gql`
    query getServerInvites($id: String!) {
        getServerSettings(id: $id) {
            invites {
                code
                uses
                maxUses
                createdBy {
                    id
                    username
                    displayName
                }
                expiresAt
                createdAt
            }
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
            owner {
                id
            }
        }
    }
`;

export const OnServerJoined = gql`
    subscription serverJoined {
        serverJoined {
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
