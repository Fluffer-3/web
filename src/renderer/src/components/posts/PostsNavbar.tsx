import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar";
import CreatePostButton from "./CreatePostButton";
import { FaFire, FaUser } from "react-icons/fa";
import { Button } from "@mantine/core";

const PostsNavbar = () => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between itemsa-center w-full border-b border-blue-500/60 shadow-2xl px-4 py-4 bg-neutral-700[.2]">
            <div className="flex justify-start items-center gap-2">
                <CreatePostButton />
            </div>
            <SearchBar />
            <div className="flex gap-2 items-center">
                <Button
                    onClick={() => navigate("/posts/trending")}
                    leftSection={<FaFire />}
                    variant="light"
                    color="red"
                >
                    Trending
                </Button>
                <Button
                    leftSection={<FaUser />}
                    onClick={() => navigate("/posts/following")}
                    variant="light"
                >
                    Following
                </Button>
            </div>
        </div>
    );
};

export default PostsNavbar;
