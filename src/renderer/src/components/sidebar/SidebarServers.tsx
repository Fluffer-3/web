import SidebarAddServerIcon from "../server/SidebarAddServerIcon";
import { useQuery } from "@apollo/client";
import { GetUserServers, OnServerCreated } from "@renderer/gql/servers";
import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ContextMenu } from "primereact/contextmenu";
import { Avatar } from "primereact/avatar";
import { useAuth } from "@renderer/hooks";
import { FaSignOutAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Tooltip } from "primereact/tooltip";

const SidebarServers = () => {
    const { serverId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const cm = useRef<ContextMenu>(null);

    const [servers, setServers] = useState<any[]>([]);
    const [currentServer, setCurrentServer] = useState<any | null>(null);

    const { subscribeToMore } = useQuery(GetUserServers, {
        onCompleted: (data) => {
            setServers(data.getUserServers);
        }
    });

    useEffect(() => {
        subscribeToMore({
            document: OnServerCreated,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newServer = subscriptionData.data.serverCreated;
                if (!newServer) return;

                setServers([newServer, ...servers]);
            }
        });
    }, [servers]);

    if (!servers) return <SidebarAddServerIcon />;
    if (servers.length === 0) return <SidebarAddServerIcon />;
    if (!serverId) return <Navigate to={`/servers/${servers[0].id}`} />;

    const items = [
        {
            label:
                user.id === currentServer?.owner.id
                    ? "Delete Server"
                    : "Leave Server",
            icon:
                user.id === currentServer?.owner.id ? (
                    <MdDeleteForever size={20} />
                ) : (
                    <FaSignOutAlt className="mr-2" />
                )
        }
    ];

    const onRightClick = (e: any, server: any) => {
        if (cm.current) {
            setCurrentServer(server);
            cm.current.show(e);
        }
    };

    return (
        <>
            {servers.map((server) => (
                <>
                    <Tooltip
                        target={`.server-icon-${server.id}`}
                        position="right"
                        content={server.name}
                    />
                    {server.icon ? (
                        <Avatar
                            key={server.id}
                            image={server.icon}
                            shape="circle"
                            className={`w-16 h-16 bg-transparent mb-1 cursor-pointer text-transparent server-icon-${server.id}`}
                            onClick={() => navigate(`/servers/${server.id}`)}
                            onContextMenu={(e) => onRightClick(e, server)}
                        />
                    ) : (
                        <Avatar
                            key={server.id}
                            label={server.nameAcronym}
                            shape="circle"
                            className={`w-16 h-16 bg-neutral-700 mb-1 cursor-pointer server-icon-${server.id}`}
                            onClick={() => navigate(`/servers/${server.id}`)}
                            onContextMenu={(e) => onRightClick(e, server)}
                        />
                    )}
                </>
            ))}
            <ContextMenu
                model={items}
                ref={cm}
                onHide={() => setCurrentServer(null)}
            />
            <SidebarAddServerIcon />
        </>
    );
};

export default SidebarServers;

/**!SECTION
 *  <SidebarIcon
                    key={server.id}
                    server={server}
                    active={server.id === serverId}
                />
 */
