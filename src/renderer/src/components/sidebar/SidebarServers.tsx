import SidebarAddServerIcon from "../server/SidebarAddServerIcon";
import { useMutation, useQuery } from "@apollo/client";
import {
    GetUserServers,
    LeaveServer,
    OnServerCreated,
    OnServerJoined
} from "@renderer/gql/servers";
import { Fragment, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@renderer/hooks";
import ServerInvitesDialog from "../server/ServerInvitesDialog";
import { Avatar, Tooltip } from "@mantine/core";
import { ContextMenuContent, useContextMenu } from "mantine-contextmenu";
import { FaMailBulk, FaSignOutAlt, FaTrash } from "react-icons/fa";

const SidebarServers = () => {
    const { serverId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { showContextMenu } = useContextMenu();

    const [dialogVisible, setDialogVisible] = useState(false);

    const [servers, setServers] = useState<any[]>([]);

    const { subscribeToMore, refetch } = useQuery(GetUserServers, {
        onCompleted: (data) => {
            setServers(data.getUserServers);
        }
    });

    const [leaveServer] = useMutation(LeaveServer, {
        onCompleted: () => {
            refetch();
            if (servers.length === 0) return navigate("/servers");
            navigate(`/servers/${servers[0].id}`);
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

        subscribeToMore({
            document: OnServerJoined,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newServer = subscriptionData.data.serverJoined;
                if (!newServer) return;
                if (servers.find((server) => server.id === newServer.id))
                    return;

                setServers([newServer, ...servers]);
            }
        });
    }, [servers]);

    if (!servers || servers?.length === 0) return <SidebarAddServerIcon />;
    if (!serverId) return <Navigate to={`/servers/${servers[0].id}`} />;

    const ctxItems = (server: any) =>
        [
            {
                key: "invites",
                title: "Server Invites",
                icon: <FaMailBulk size={14} />,
                onClick: () => setDialogVisible(true),
                hidden: user.id !== server.owner.id
            },
            {
                key: "leaveOrDelete",
                title:
                    user.id === server.owner.id
                        ? "Delete Server"
                        : "Leave Server",
                icon:
                    user.id === server.owner.id ? (
                        <FaTrash size={14} />
                    ) : (
                        <FaSignOutAlt size={14} />
                    ),
                onClick: () => {
                    if (user.id === server.owner.id) {
                        // Delete server
                    } else {
                        leaveServer({ variables: { id: server.id } });
                    }
                }
            }
        ] as ContextMenuContent;

    return (
        <>
            {servers.map((server, i) => (
                <Fragment key={i}>
                    <Tooltip color="gray" label={server.name} position="right">
                        {server.icon ? (
                            <Avatar
                                src={server.icon}
                                onClick={() =>
                                    navigate(`/servers/${server.id}`)
                                }
                                className="cursor-pointer"
                                size="lg"
                                onContextMenu={showContextMenu(
                                    ctxItems(server),
                                    {
                                        className: "w-40"
                                    }
                                )}
                            />
                        ) : (
                            <Avatar
                                onClick={() =>
                                    navigate(`/servers/${server.id}`)
                                }
                                className="cursor-pointer"
                                size="lg"
                                onContextMenu={showContextMenu(
                                    ctxItems(server),
                                    {
                                        className: "w-40"
                                    }
                                )}
                            >
                                {server.nameAcronym}
                            </Avatar>
                        )}
                    </Tooltip>
                    {dialogVisible && (
                        <ServerInvitesDialog
                            server={server}
                            visible={dialogVisible}
                            setVisible={setDialogVisible}
                        />
                    )}
                </Fragment>
            ))}
            <SidebarAddServerIcon />
        </>
    );
};

export default SidebarServers;
