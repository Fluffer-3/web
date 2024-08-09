import { Button } from "@mantine/core";
import { FaPlusCircle } from "react-icons/fa";

const CreatePostButton = () => {
    return (
        <>
            <Button
                variant="light"
                color="green"
                leftSection={<FaPlusCircle />}
            >
                Create Post
            </Button>
        </>
    );
};

export default CreatePostButton;
