import ServerSidebar from "@renderer/components/server/ServerSidebar";
import { Outlet } from "react-router-dom";

const ServerLayout = () => {
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
