import "./index.css";
import "@mantine/core/styles.css";
import "mantine-contextmenu/styles.css";
import "@mantine/notifications/styles.css";

import { createRoot } from "react-dom/client";

import MainProvider from "./providers/MainProvider";

const container = document.getElementById("app");
const root = createRoot(container!);

root.render(<MainProvider />);
