import classNames from "classnames";
import { Avatar } from "primereact/avatar";
import { ContextMenu } from "primereact/contextmenu";
import { Tooltip } from "primereact/tooltip";
import { useRef, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SidebarIcon = ({ server, user, active }: any) => {
    const navigate = useNavigate();

    const ServerIcon = () => {
        const cmRef = useRef<ContextMenu>(null);
        const [selectedId, setSelectedId] = useState<string | null>(null);

        const onRightClick = (e: any, id: string) => {
            if (cmRef.current) {
                setSelectedId(id);
                cmRef.current.show(e);
            }
        };

        return (
            <>
                <Tooltip target=".server-icon" content={server.name} />
                <ContextMenu
                    ref={cmRef}
                    model={[
                        {
                            label: "Leave Server",
                            icon: <FaSignOutAlt className="mr-2" />,
                            command: () => {
                                console.log("Leave server");
                            }
                        }
                    ]}
                />

                {server.icon ? (
                    <Avatar
                        className={classNames(
                            "w-16 h-16 bg-transparent mb-1 cursor-pointer text-transparent server-icon"
                        )}
                        image={server.icon}
                        onContextMenu={(e) => onRightClick(e, server.id)}
                        shape="circle"
                        onClick={() => navigate(`/servers/${server.id}`)}
                    />
                ) : (
                    <Avatar
                        className="bg-neutral-700 w-16 h-16 mb-1 cursor-pointer server-icon"
                        onClick={() => navigate(`/servers/${server.id}`)}
                        onContextMenu={(e) => onRightClick(e, server.id)}
                        label={server.nameAcronym}
                        shape="circle"
                    />
                )}
            </>
        );
    };

    const UserIcon = () => (
        <>
            <Tooltip
                target=".user-icon"
                content={user.globalName ?? user.username}
            />
            {user.avatar ? (
                <Avatar
                    className="bg-transparent mb-1 cursor-pointer"
                    image={user.avatar}
                    onClick={() => navigate(`/posts/${user.id}`)}
                />
            ) : (
                <Avatar
                    className="bg-neutral-700 mb-1 cursor-pointer hover:bg-neutral-800 transition-colors duration-200 ease-in-out"
                    onClick={() => navigate(`/posts/${user.id}`)}
                >
                    <span className="text-lg">
                        {user.globalName
                            ? user.globalName
                                  .split(" ")
                                  .map((str: string) => str[0].toUpperCase())
                                  .join("")
                            : user.username[0].toUpperCase()}
                    </span>
                </Avatar>
            )}
        </>
    );

    return server ? <ServerIcon /> : <UserIcon />;
};

export default SidebarIcon;
