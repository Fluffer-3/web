import { Route, Routes } from "react-router-dom";
import { CustomProvider } from "rsuite";

import { LoginPage, NotFound, RegisterPage } from "./pages";
import { useQuery } from "@apollo/client";
import { APIStatus } from "./gql/general";
import Layout from "./layouts/Layout";
import { useEffect, useState } from "react";
import APILoading from "./components/status/APILoading";
import APIDown from "./components/status/APIDown";

import ServerPage from "./pages/servers/Server";
import PostPage from "./pages/posts/Post";
import ServerLayout from "./layouts/ServerLayout";
import PostLayout from "./layouts/PostsLayout";

const App = () => {
    const [apiStatus, setApiStatus] = useState(false);

    const { loading, data: { apiStatus: status } = {} } = useQuery(APIStatus, {
        pollInterval: apiStatus ? 50000 : 1000,
        fetchPolicy: "no-cache"
    });

    useEffect(() => {
        if (status) setApiStatus(true);
    }, [status]);

    if (loading) return <APILoading />;
    if (!status) return <APIDown />;

    return (
        <CustomProvider theme="dark">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/servers" element={<ServerLayout />}>
                        <Route path=":serverId" element={<ServerPage />} />
                    </Route>
                    <Route path="/posts" element={<PostLayout />}>
                        <Route path=":postId" element={<PostPage />} />
                    </Route>
                </Route>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </CustomProvider>
    );
};

export default App;
