import PostsNavbar from "@renderer/components/posts/PostsNavbar";
import { Outlet } from "react-router-dom";

const PostLayout = () => {
    return (
        <div className="flex flex-col w-full h-full">
            <PostsNavbar />
            <div className="p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default PostLayout;
