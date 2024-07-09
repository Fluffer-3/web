import SidebarIcon from "../sidebar/SidebarIcon";
import SidebarAddServerIcon from "../server/SidebarAddServerIcon";

const SidebarServers = () => {
    const mockData: any[] = [
        {
            id: "1",
            name: "Server 1",
            nameAcronym: "S1",
            icon: "https://static-00.iconduck.com/assets.00/perspective-dice-random-icon-469x512-mm6xb9so.png",
            iconUrl:
                "https://static-00.iconduck.com/assets.00/perspective-dice-random-icon-469x512-mm6xb9so.png"
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
