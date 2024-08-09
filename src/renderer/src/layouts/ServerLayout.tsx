import { useQuery } from "@apollo/client";
import ServerSidebar from "@renderer/components/server/ServerSidebar";
import { CheckServerAccess } from "@renderer/gql/servers";
import { Outlet, useParams } from "react-router-dom";
import ms from "ms";

const ServerLayout = () => {
    const { serverId } = useParams();

    const { loading, data: { checkServerAccess: access } = {} } = useQuery(
        CheckServerAccess,
        {
            variables: { id: serverId },
            pollInterval: ms("1min")
        }
    );

    if (loading) return <></>;

    if (!serverId) return <div>Woah!</div>;

    if (!access) return <div>You don't have access to this server</div>;

    return (
        <div className="flex items-start jusify-start w-full h-full">
            <ServerSidebar />
            <div className="p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default ServerLayout;
