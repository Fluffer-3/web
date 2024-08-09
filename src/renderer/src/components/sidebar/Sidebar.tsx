import SidebarPosts from "./SidebarPosts";
import SidebarServers from "./SidebarServers";
import { useAppMode } from "../../hooks";
import SwitchModeButton from "../SwitchModeButton";
import classNames from "classnames";
import { Avatar } from "@mantine/core";

const Sidebar = () => {
    const { appMode } = useAppMode();

    return (
        <div
            className={classNames(
                "flex flex-col items-center justify-centerh-screen bg-neutral-700/[.2] gap-1",
                {
                    "border-r border-blue-500/60": appMode === "posts",
                    "border-r border-green-500/60": appMode === "servers"
                }
            )}
        >
            <Avatar
                className={classNames({
                    "border-2 border-blue-500/60": appMode === "posts",
                    "border-2 border-green-500/60": appMode === "servers"
                })}
                src="/logo.png"
                size={64}
            />

            <div
                className={classNames(
                    "flex flex-col items-center flex-grow w-full shadow-2xl bg-neutral-700/[.4] px-5 py-3 border-y gap-1",
                    {
                        "border-blue-500/60": appMode === "posts",
                        "border-green-500/60": appMode === "servers"
                    }
                )}
            >
                {appMode === "posts" ? <SidebarPosts /> : <SidebarServers />}
            </div>

            <div className="p-1">
                <SwitchModeButton />
            </div>
        </div>
    );
};

export default Sidebar;
