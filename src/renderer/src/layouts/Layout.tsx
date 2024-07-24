import Sidebar from "@renderer/components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex flex-col items-start justify-start w-full h-screen">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
