import "./themes/theme.less";
import "tailwindcss/tailwind.css";

import { createRoot } from "react-dom/client";

import { ThemeProvider } from "./providers/ThemeProvider";
import MainProvider from "./providers/MainProvider";

const container = document.getElementById("app");
const root = createRoot(container!);

root.render(
    <ThemeProvider>
        <MainProvider />
    </ThemeProvider>
);
