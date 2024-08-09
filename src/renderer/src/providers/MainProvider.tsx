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

import App from "../App";
import { AuthProvider } from "./AuthProvider";
import { AppModeProvider } from "./AppModeProvider";
import { ContextMenuProvider } from "mantine-contextmenu";
import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

const { VITE_APP_URL, DEV } = import.meta.env;

const httpLink = createUploadLink({
    uri: VITE_APP_URL
});

const wsUrl = VITE_APP_URL.replace("http", "ws").replace("https", "wss");

const wsLink = new GraphQLWsLink(
    createClient({
        url: wsUrl,
        connectionParams: {
            token: localStorage.getItem("ff-token")
        },
        keepAlive: 10000
    })
);

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("ff-token");
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
            "apollo-require-preflight": true
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
    httpLink as any
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

const theme = createTheme({
    fontFamily: "Montserrat, sans-serif"
});

export default function MainProvider() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ApolloProvider client={client}>
                    <Router>
                        <MantineProvider theme={theme} forceColorScheme="dark">
                            <ContextMenuProvider>
                                <AuthProvider>
                                    <AppModeProvider>
                                        <Notifications />
                                        <App />
                                    </AppModeProvider>
                                </AuthProvider>
                            </ContextMenuProvider>
                        </MantineProvider>
                    </Router>
                </ApolloProvider>
            </PersistGate>
        </Provider>
    );
}
