import SidebarPosts from "./SidebarPosts";
import SidebarServers from "./SidebarServers";
import { useAppMode } from "../../hooks";
import { Avatar, VStack } from "rsuite";
import SwitchModeButton from "../SwitchModeButton";
import classNames from "classnames";

const Sidebar = () => {
    const { appMode } = useAppMode();

    return (
        <VStack
            justifyContent="center"
            alignItems="center"
            spacing={5}
            className={classNames("h-screen bg-neutral-700/[.2]", {
                "border-r border-blue-500": appMode === "posts",
                "border-r border-green-500": appMode === "servers"
            })}
        >
            <Avatar
                className={classNames("bg-transparent", {
                    "border-2 border-blue-500": appMode === "posts",
                    "border-2 border-green-500": appMode === "servers"
                })}
                src="/logo.png"
                size="lg"
                circle
            />

            <VStack
                alignItems="center"
                className={classNames(
                    "flex-grow w-full shadow-2xl bg-neutral-700/[.4] px-5 py-3 border-y gap-3",
                    {
                        "border-blue-500": appMode === "posts",
                        "border-green-500": appMode === "servers"
                    }
                )}
            >
                {appMode === "posts" ? <SidebarPosts /> : <SidebarServers />}
            </VStack>

            <SwitchModeButton />
        </VStack>
    );
};

export default Sidebar;
