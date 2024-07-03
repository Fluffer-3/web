import { Route, Routes } from "react-router-dom";
import { Home, Login, NotFound, SignUp } from "./pages";
import { useQuery } from "@apollo/client";
import { APIStatus } from "./gql/general";
import Layout from "./components/Layout";
import { useEffect, useState } from "react";
import APILoading from "./components/status/APILoading";
import APIDown from "./components/status/APIDown";

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
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/servers" element={<Home />} />
                    <Route path="/posts" element={<Home />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default App;
