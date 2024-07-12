import { Button, HStack, Stack } from "rsuite";
import ProfileMenu from "../ProfileMenu";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar";
import CreatePostButton from "./CreatePostButton";

const PostsNavbar = () => {
    const navigate = useNavigate();

    return (
        <HStack
            alignItems="center"
            justifyContent="space-between"
            className="w-full border-b border-blue-500 shadow-2xl px-4 py-2 bg-neutral-700[.2]"
        >
            <HStack justifyContent="flex-start" alignItems="center">
                <ProfileMenu />
                <Stack className="ml-4">
                    <CreatePostButton />
                </Stack>
            </HStack>
            <SearchBar />
            <HStack className="ml-4">
                <Button
                    onClick={() => navigate("/posts/trending")}
                    color="red"
                    appearance="ghost"
                >
                    Trending
                </Button>
            </HStack>
        </HStack>
    );
};

export default PostsNavbar;
