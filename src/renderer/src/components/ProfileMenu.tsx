import { Avatar } from "primereact/avatar";
import { useAppMode, useAuth } from "../hooks";
import { FaSignOutAlt } from "react-icons/fa";

export const ProfileMenu = () => {
    const { user, logout } = useAuth();
    const { appMode } = useAppMode();

    if (!user) return <></>;

    const renderToggle = (props) =>
        user.avatar ? (
            <Avatar
                className="bg-transparent cursor-pointer"
                src={user.avatar}
                alt={user.username}
                color={appMode === "servers" ? "green" : "blue"}
                circle
                {...props}
            />
        ) : (
            <Avatar
                className="cursor-pointer bg-neutral-700"
                color={appMode === "servers" ? "green" : "blue"}
                alt={user.username}
                circle
                {...props}
            >
                <span>
                    {user.globalName
                        ? user.globalName
                              .split(" ")
                              .map((str: string) => str[0].toUpperCase())
                              .join("")
                        : user.username[0].toUpperCase()}
                </span>
            </Avatar>
        );

    return <></>;
};

export default ProfileMenu;
