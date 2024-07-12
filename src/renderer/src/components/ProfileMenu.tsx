import { Avatar, Dropdown, Text } from "rsuite";
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
                <Text size={18}>
                    {user.globalName
                        ? user.globalName
                              .split(" ")
                              .map((str: string) => str[0].toUpperCase())
                              .join("")
                        : user.username[0].toUpperCase()}
                </Text>
            </Avatar>
        );

    return (
        <Dropdown noCaret renderToggle={renderToggle}>
            <Dropdown.Item panel style={{ padding: "10px 20px" }}>
                {user.globalName ? (
                    <>
                        <Text size="lg">{user.globalName}</Text>
                        <Text>@{user.username}</Text>
                    </>
                ) : (
                    <Text>@{user.username}</Text>
                )}
            </Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item
                style={{
                    padding: "10px 20px"
                }}
                className="cursor-pointer flex justify-center items-center"
                panel
                onClick={() => logout()}
            >
                <FaSignOutAlt className="mr-1" />
                Logout
            </Dropdown.Item>
        </Dropdown>
    );
};

export default ProfileMenu;
