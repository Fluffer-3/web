import Sidebar from "@renderer/components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { VStack } from "rsuite";

const Layout = () => {
    return (
        <div className="flex">
            <Sidebar />
            <VStack className="w-full h-screen">
                <Outlet />
            </VStack>
        </div>
    );
};

export default Layout;
