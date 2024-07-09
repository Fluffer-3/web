import { Outlet, useParams } from "react-router-dom";
import { HStack } from "rsuite";

const ServerLayout = () => {
    const { serverId } = useParams();

    console.log(serverId);

    return (
        <HStack>
            <div>Sidebar</div>
            <Outlet />
        </HStack>
    );
};

export default ServerLayout;
