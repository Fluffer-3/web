import { Button } from "primereact/button";
import { FaPlusCircle } from "react-icons/fa";

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
