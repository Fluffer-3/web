import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { Avatar, IconButton, Tooltip, Text, Whisper, Button } from "rsuite";

const SidebarIcon = ({ server, user }: any) => {
    const navigate = useNavigate();

    if (server)
        return (
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
                    <IconButton
                        circle
                        className={classNames("bg-transparent")}
                        onClick={() => navigate(`/servers/${server.id}`)}
                        icon={
                            <Avatar
                                className="bg-transparent"
                                src={server.icon ?? ""}
                                alt={server.nameAcronym}
                            />
                        }
                    />
                ) : (
                    <Button
                        className={classNames(
                            "w-14 h-14 rounded-full bg-transparent",
                            server.icon
                                ? ""
                                : "bg-neutral-600 border border-neutral-900[.1]"
                        )}
                        onClick={() => navigate(`/servers/${server.id}`)}
                    >
                        <Text size="lg">{server.nameAcronym}</Text>
                    </Button>
                )}
            </Whisper>
        );

    if (user)
        return (
            <Whisper
                placement="right"
                trigger="hover"
                speaker={
                    <Tooltip>
                        <Text size="lg">
                            {user.globalName ?? user.username}
                        </Text>
                    </Tooltip>
                }
            >
                {user.avatar ? (
                    <IconButton
                        circle
                        className={classNames("bg-transparent")}
                        onClick={() => navigate(`/posts/${user.id}`)}
                        icon={
                            <Avatar
                                className="bg-transparent"
                                src={user.avatar ?? ""}
                                alt={user.username}
                            />
                        }
                    />
                ) : (
                    <Button
                        className={classNames(
                            "w-14 h-14 rounded-full bg-transparent",
                            user.avatar
                                ? ""
                                : "bg-neutral-600 border border-neutral-900[.1]"
                        )}
                        onClick={() => navigate(`/posts/${user.id}`)}
                    >
                        <Text size="lg">
                            {user.globalName
                                ? user.globalName
                                      .split(" ")
                                      .map((str: string) =>
                                          str[0].toUpperCase()
                                      )
                                      .join("")
                                : user.username[0].toUpperCase()}
                        </Text>
                    </Button>
                )}
            </Whisper>
        );

    return <></>;
};

export default SidebarIcon;
