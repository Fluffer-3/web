import { Outlet } from "react-router-dom";

import Sidebar from "./sidebar/Sidebar";
import Toolbar from "./Toolbar";
import ContextMenu from "./ContextMenu";

const Layout = () => {
    return (
        <>
            <ContextMenu />
            <div className="flex">
                <Sidebar />
                <div className="flex flex-col w-full">
                    <div className="flex justify-center shadow-2xl w-full">
                        <Toolbar />
                    </div>
                    <div className="flex flex-col items-start p-8 h-full">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;
