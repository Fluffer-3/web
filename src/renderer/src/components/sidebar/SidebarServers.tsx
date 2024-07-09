import SidebarIcon from "../sidebar/SidebarIcon";
import SidebarAddServerIcon from "../server/SidebarAddServerIcon";
import { Navigate, useParams } from "react-router-dom";

const SidebarServers = () => {
    const { serverId } = useParams();

    const mockData: any[] = [
        {
            id: "1",
            name: "Server 1",
            nameAcronym: "S1",
            icon: "https://images-ext-1.discordapp.net/external/PYMccFyhxiLCipbReDkG3fzQaRGr5UOeR5yiNd0kbm4/%3Fsize%3D256/https/cdn.discordapp.com/avatars/401269337924829186/a_36e2b03c7e8032ee16a60cf7f95db736.gif?width=281&height=281",
            iconUrl:
                "https://images-ext-1.discordapp.net/external/PYMccFyhxiLCipbReDkG3fzQaRGr5UOeR5yiNd0kbm4/%3Fsize%3D256/https/cdn.discordapp.com/avatars/401269337924829186/a_36e2b03c7e8032ee16a60cf7f95db736.gif?width=281&height=281"
        },
        {
            id: "2",
            name: "Server 2",
            nameAcronym: "S2"
        },
        {
            id: "3",
            name: "Server 3",
            nameAcronym: "S3"
        }
    ];

    if (!serverId) return <Navigate to={`/servers/${mockData[0].id}`} />;

    return (
        <>
            {mockData.map((server) => (
                <SidebarIcon key={server.id} server={server} />
            ))}
            <SidebarAddServerIcon />
        </>
    );
};

export default SidebarServers;
