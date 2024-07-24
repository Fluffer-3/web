import { useQuery } from "@apollo/client";
import { GetServerSidebarInfo } from "@renderer/gql/servers";
import { useParams } from "react-router-dom";

const ServerSidebar = () => {
    const { serverId } = useParams();

    if (!serverId) return <></>;

    const { loading, data: { getServer: server } = {} } = useQuery(
        GetServerSidebarInfo,
        {
            variables: { id: serverId }
        }
    );

    if (loading) return <></>;
    if (!server) return <></>;

    return (
        <div className="flex flex-col items-center h-screen border-r w-60 border-r-green-500 bg-neutral-700/[.2]">
            <div className="flex h-[4.3rem] shadow-2xl bg-neutral-800 border-b border-b-green-500 px-3 py-2 w-full">
                <span className="text-neutral-200 text-lg truncate">
                    {server.name}
                </span>
            </div>
        </div>
    );
};

export default ServerSidebar;
