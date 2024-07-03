import {
    ApolloClient,
    ApolloLink,
    ApolloProvider,
    InMemoryCache,
    split
} from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../reducers";

import { PrimeReactProvider } from "primereact/api";

import App from "../App";
import { AuthProvider } from "./AuthProvider";
import { AppModeProvider } from "./AppModeProvider";

const { VITE_APP_URL, DEV } = import.meta.env;

const httpLink = createUploadLink({
    uri: VITE_APP_URL
});

const wsUrl = `${VITE_APP_URL.replace("http", "ws").replace(
    "https",
    "wss"
)}/ws`;

const wsLink = new GraphQLWsLink(
    createClient({
        url: wsUrl,
        connectionParams: {
            token: localStorage.getItem("ff-token")
        }
    })
);

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("ff-token");
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ""
        }
    };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (!DEV) return;
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
            console.log(
                `[GraphQL Error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            );
        });
    }
    if (networkError) console.log(`[Network Error]: ${networkError}`);
});

const retryLink = new RetryLink({
    delay: {
        initial: 300,
        max: Infinity,
        jitter: true
    },
    attempts: {
        max: 5,
        retryIf: (error) => !!error
    }
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
        );
    },
    wsLink,
    httpLink
);

const link = ApolloLink.from([retryLink, errorLink, authLink, splitLink]);
const cache = new InMemoryCache({
    addTypename: false
});

const client = new ApolloClient({
    link,
    cache,
    defaultOptions: {
        watchQuery: {
            fetchPolicy: "cache-and-network"
        }
    }
});

export default (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ApolloProvider client={client}>
                <PrimeReactProvider>
                    <Router>
                        <AuthProvider>
                            <AppModeProvider>
                                <App />
                            </AppModeProvider>
                        </AuthProvider>
                    </Router>
                </PrimeReactProvider>
            </ApolloProvider>
        </PersistGate>
    </Provider>
);
