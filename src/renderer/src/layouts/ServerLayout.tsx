import { Outlet } from "react-router-dom";
import { HStack } from "rsuite";

const ServerLayout = () => {
    return (
        <HStack>
            <div className="border-r-2">Sidebar</div>
            <Outlet />
        </HStack>
    );
};

export default ServerLayout;
