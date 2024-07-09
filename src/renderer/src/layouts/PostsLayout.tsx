import { Outlet, useParams } from "react-router-dom";
import { VStack } from "rsuite";

const PostLayout = () => {
    const { postId } = useParams();

    console.log(postId);

    return (
        <VStack>
            <div>Navbar</div>
            <Outlet />
        </VStack>
    );
};

export default PostLayout;
