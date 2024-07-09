import { Text, VStack } from "rsuite";
import Logo from "../Logo";

const APIDown = () => {
    return (
        <VStack
            alignItems="center"
            justifyContent="center"
            className="h-screen"
        >
            <Logo />
            <Text weight="bold" size={30}>
                Fluffer
            </Text>
            <Text size="xxl" weight="semibold">
                😢 Server is down 😢
            </Text>
        </VStack>
    );
};

export default APIDown;
