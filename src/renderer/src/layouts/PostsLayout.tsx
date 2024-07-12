import PostsNavbar from "@renderer/components/PostsNavbar";
import { Outlet } from "react-router-dom";
import { VStack } from "rsuite";

const PostLayout = () => {
    return (
        <VStack className="w-full h-full">
            <PostsNavbar />
            <div className="p-8">
                <Outlet />
            </div>
        </VStack>
    );
};

export default PostLayout;
