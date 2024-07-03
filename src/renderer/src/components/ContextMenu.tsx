import { ContextMenu as PContextMenu } from "primereact/contextmenu";
import { useAppMode, useAuth } from "../hooks";
import { MenuItem } from "primereact/menuitem";
import { BiLogOut, BiRepost, BiServer } from "react-icons/bi";

const ContextMenu = () => {
    const { appMode, changeAppMode } = useAppMode();
    const { logout } = useAuth();

    const items: MenuItem[] = [
        {
            label:
                appMode === "servers" ? "Switch to Posts" : "Switch to Servers",
            icon:
                appMode === "servers" ? (
                    <BiRepost size="1.5rem" />
                ) : (
                    <BiServer size="1.5rem" />
                ),
            command: () =>
                changeAppMode(appMode === "servers" ? "posts" : "servers")
        },
        {
            separator: true
        },
        {
            label: "Logout",
            icon: <BiLogOut size="1.5rem" />,
            command: () => logout()
        }
    ];

    return <PContextMenu global model={items} breakpoint="767px" />;
};

export default ContextMenu;
