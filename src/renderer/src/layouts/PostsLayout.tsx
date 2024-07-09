import { Outlet } from "react-router-dom";
import { VStack } from "rsuite";

const PostLayout = () => {
    return (
        <VStack>
            <div className="border-b-2">Navbar</div>
            <Outlet />
        </VStack>
    );
};

export default PostLayout;
