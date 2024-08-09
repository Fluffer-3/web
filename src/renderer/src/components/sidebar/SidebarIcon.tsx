import { Avatar, Tooltip } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const SidebarIcon = ({ user, active }: any) => {
    const navigate = useNavigate();

    const UserIcon = () => (
        <Tooltip
            color="gray"
            position="right"
            label={user.globalName ?? user.username}
        >
            {user.avatar ? (
                <Avatar
                    src={user.avatar}
                    onClick={() => navigate(`/posts/${user.id}`)}
                    className="cursor-pointer"
                    size="lg"
                />
            ) : (
                <Avatar
                    onClick={() => navigate(`/posts/${user.id}`)}
                    className="cursor-pointer"
                    size="lg"
                >
                    {(user.globalName ?? user.username)
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .toUpperCase()}
                </Avatar>
            )}
        </Tooltip>
    );

    return <UserIcon />;
};

export default SidebarIcon;
