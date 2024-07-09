import SidebarPosts from "../posts/SidebarPosts";
import SidebarServers from "../server/SidebarServers";
import { useAppMode } from "../../hooks";
import { Avatar, VStack } from "rsuite";
import SwitchModeButton from "../SwitchModeButton";
import classNames from "classnames";

const Sidebar = () => {
    const { appMode } = useAppMode();

    return (
        <div className="flex flex-col h-screen justify-between items-center gap-1 bg-neutral-700/[.2]">
            <Avatar
                className={classNames(
                    "bg-transparent",
                    appMode === "posts"
                        ? "border border-blue-500"
                        : "border border-green-500"
                )}
                src="/logo.png"
                size="lg"
                circle
            />

            <VStack
                alignItems="center"
                className={classNames(
                    "flex-grow w-full shadow-2xl bg-neutral-700/[.4] px-5 py-3 border-y gap-3",
                    appMode === "posts" ? "border-blue-500" : "border-green-500"
                )}
            >
                {appMode === "posts" ? <SidebarPosts /> : <SidebarServers />}
            </VStack>

            <SwitchModeButton />
        </div>
    );
};

export default Sidebar;
