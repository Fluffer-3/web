import { Avatar } from "primereact/avatar";
import SidebarPosts from "./posts/SidebarPosts";
import SidebarServers from "./servers/SidebarServers";
import { Tooltip } from "primereact/tooltip";
import { useAppMode } from "../../hooks";

const Sidebar = () => {
    const { appMode, changeAppMode } = useAppMode();

    return (
        <>
            <Tooltip
                target=".switch-between"
                content={`Switch to ${
                    appMode === "posts" ? "Servers" : "Posts"
                }`}
                position="right"
            />
            <div className="flex flex-col h-screen justify-between items-center">
                <div className="pb-2">
                    {appMode === "posts" ? (
                        <>
                            <Avatar
                                shape="circle"
                                label="Posts"
                                className="switch-between w-16 h-16 border border-blue-500"
                                onClick={() => changeAppMode("servers")}
                            />
                        </>
                    ) : (
                        <Avatar
                            shape="circle"
                            label="Servers"
                            className="switch-between w-16 h-16 border border-green-500"
                            onClick={() => changeAppMode("posts")}
                        />
                    )}
                </div>
                {appMode === "posts" ? <SidebarPosts /> : <SidebarServers />}
            </div>
        </>
    );
};

export default Sidebar;
