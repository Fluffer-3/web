import { Outlet } from "react-router-dom";
import { HStack } from "rsuite";

const ServerLayout = () => {
    return (
        <HStack className="w-full h-full">
            <div className="border-r-2">Sidebar</div>
            <div className="p-8">
                <Outlet />
            </div>
        </HStack>
    );
};

export default ServerLayout;
