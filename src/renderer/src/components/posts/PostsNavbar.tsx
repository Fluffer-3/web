import ProfileMenu from "../ProfileMenu";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar";
import CreatePostButton from "./CreatePostButton";
import { Button } from "primereact/button";

const PostsNavbar = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-between itemsa-center w-full border-b border-blue-500 shadow-2xl px-4 py-2 bg-neutral-700[.2]">
            <div className="flex justify-start items-center">
                <ProfileMenu />
                <div className="flex ml-4">
                    <CreatePostButton />
                </div>
            </div>
            <SearchBar />
            <div className="flex ml-4">
                <Button onClick={() => navigate("/posts/trending")} color="red">
                    Trending
                </Button>
            </div>
        </div>
    );
};

export default PostsNavbar;
