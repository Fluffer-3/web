import { Heading, Text, VStack } from "rsuite";

const ErrorMessage = ({
    message,
    subtext
}: {
    message: string;
    subtext?: string | string[];
}) => (
    <VStack className="justify-center items-center">
        <Heading level={2} className="text-2xl font-bold">
            {message}
        </Heading>
        {subtext &&
            (Array.isArray(subtext) ? (
                subtext.map((text, i) => (
                    <Text size="xl" key={i}>
                        {text}
                    </Text>
                ))
            ) : (
                <p className="text-lg">{subtext}</p>
            ))}
    </VStack>
);

export default ErrorMessage;
