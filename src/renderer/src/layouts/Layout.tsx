import { Outlet } from "react-router-dom";

import Sidebar from "../components/sidebar/Sidebar";
import { VStack } from "rsuite";

const Layout = () => {
    return (
        <div className="flex">
            <Sidebar />
            <VStack className="w-full p-8 h-full">
                <Outlet />
            </VStack>
        </div>
    );
};

export default Layout;
