import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";
import { AppModeContextType } from "@renderer/@types";

export const AppModeContext = createContext<AppModeContextType>({
    appMode: "servers",
    setAppMode: (_appMode: "servers" | "posts") => void 0,
    changeAppMode: (_appMode: "servers" | "posts") => void 0
});

export function AppModeProvider({ children }: PropsWithChildren) {
    const location = useLocation();
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const [appMode, setAppMode] = useState<"servers" | "posts">("servers");

    useEffect(() => {
        if (
            !isLoggedIn &&
            (location.pathname.includes("servers") ||
                location.pathname.includes("posts"))
        )
            navigate("/login");
        if (
            isLoggedIn &&
            (location.pathname === "/login" || location.pathname === "/sign-up")
        )
            navigate(appMode);

        if (isLoggedIn && location.pathname === "/") navigate(appMode);
        if (location.pathname.includes("servers")) setAppMode("servers");
        if (location.pathname.includes("posts")) setAppMode("posts");
    }, [isLoggedIn, location.pathname, appMode]);

    const changeAppMode = (appMode: "servers" | "posts") => {
        setAppMode(appMode);
        navigate(appMode);
    };

    return (
        <AppModeContext.Provider value={{ appMode, setAppMode, changeAppMode }}>
            {children}
        </AppModeContext.Provider>
    );
}
