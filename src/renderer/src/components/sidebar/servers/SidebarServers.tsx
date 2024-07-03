import { BiPlus } from "react-icons/bi";
import SidebarServersButton from "./SidebarServersButton";
import { Server } from "@renderer/@types";

const SidebarServers = () => {
    const mockData: Server[] = [
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
        <div className="flex flex-col items-center flex-grow w-full shadow-2xl bg-neutral-700/[.2] p-5 border-y gap-3 border-green-500">
            {mockData.map((server) => (
                <SidebarServersButton server={server} />
            ))}
            <SidebarServersButton
                icon={<BiPlus size="1.5em" className="text-green-500" />}
                label="Create a server"
            />
        </div>
    );
};

export default SidebarServers;
