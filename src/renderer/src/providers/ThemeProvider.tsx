import { useAuth } from "@renderer/hooks";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

export const ThemeContext = createContext<{
    theme: "light" | "dark";
    changeTheme: (_theme: "light" | "dark") => void;
    toggleTheme: () => void;
}>({
    theme: "light",
    changeTheme: (_theme: "light" | "dark") => void 0,
    toggleTheme: () => void 0
});

export function ThemeProvider({ children }: PropsWithChildren) {
    const { user } = useAuth();

    const [theme, changeTheme] = useState<"light" | "dark">(
        user?.themePreference || "dark"
    );

    useEffect(() => {
        if (user) changeTheme(user.themePreference || "dark");
    }, [user]);

    useEffect(() => {
        theme === "dark"
            ? document.body.classList.add("dark")
            : document.body.classList.remove("dark");
    });

    const toggleTheme = () => {
        changeTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <ThemeContext.Provider value={{ theme, changeTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
