import { VStack, Loader } from "rsuite";

const APILoading = () => {
    return (
        <VStack
            alignItems="center"
            justifyContent="center"
            className="h-screen"
        >
            <Loader size="lg" />
        </VStack>
    );
};

export default APILoading;
