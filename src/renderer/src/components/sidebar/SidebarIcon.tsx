import { useNavigate } from "react-router-dom";
import { Avatar, Tooltip, Text, Whisper } from "rsuite";

const SidebarIcon = ({ server, user, active, hovered }: any) => {
    const navigate = useNavigate();

    const ServerIcon = () => (
        <Whisper
            placement="right"
            trigger="hover"
            speaker={
                <Tooltip>
                    <Text size="lg">{server.name}</Text>
                </Tooltip>
            }
        >
            {server.icon ? (
                <Avatar
                    size="lg"
                    className=" bg-transparent mb-1 cursor-pointer"
                    src={server.icon}
                    alt={server.name}
                    circle
                    onClick={() => navigate(`/servers/${server.id}`)}
                />
            ) : (
                <Avatar
                    size="lg"
                    className="mb-1 cursor-pointer"
                    alt={server.name}
                    circle
                    onClick={() => navigate(`/servers/${server.id}`)}
                >
                    <Text size={18}>{server.nameAcronym}</Text>
                </Avatar>
            )}
        </Whisper>
    );

    const UserIcon = () => (
        <Whisper
            placement="right"
            trigger="hover"
            speaker={
                <Tooltip>
                    <Text size="lg">{user.globalName ?? user.username}</Text>
                </Tooltip>
            }
        >
            {user.avatar ? (
                <Avatar
                    size="lg"
                    className="bg-transparent mb-1 cursor-pointer"
                    src={user.avatar}
                    alt={" "}
                    circle
                    onClick={() => navigate(`/posts/${user.id}`)}
                ></Avatar>
            ) : (
                <Avatar
                    size="lg"
                    className="bg-neutral-700 mb-1 cursor-pointer hover:bg-neutral-800 transition-colors duration-200 ease-in-out"
                    alt={user.username}
                    circle
                    onClick={() => navigate(`/posts/${user.id}`)}
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
            )}
        </Whisper>
    );

    return server ? <ServerIcon /> : <UserIcon />;
};

export default SidebarIcon;
