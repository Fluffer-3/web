import { FaPlusCircle } from "react-icons/fa";
import { Button } from "rsuite";

const CreatePostButton = () => {
    return (
        <>
            <Button color="green">
                <FaPlusCircle className="mr-1" /> Create Post
            </Button>
        </>
    );
};

export default CreatePostButton;
