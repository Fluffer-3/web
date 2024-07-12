import { Button, HStack } from "rsuite";
import ProfileMenu from "./ProfileMenu";
import SearchBar from "./SearchBar";

const PostsNavbar = () => {
    return (
        <HStack
            alignItems="center"
            className="w-full border-b border-blue-500 shadow-2xl px-4 py-2 bg-neutral-700[.2]"
        >
            <HStack
                justifyContent="center"
                className="justify-self-start"
                alignItems="center"
            >
                <ProfileMenu />
                <HStack className="ml-4">
                    <Button appearance="ghost">Overview</Button>
                </HStack>
            </HStack>
            <div className="flex justify-self-center">
                <SearchBar />
            </div>
        </HStack>
    );
};

export default PostsNavbar;
