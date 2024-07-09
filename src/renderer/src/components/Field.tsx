import { ForwardedRef, forwardRef } from "react";
import { Form, HStack, Text } from "rsuite";

const Field = forwardRef(
    (
        { name, message, label, accepter, error, required, ...rest }: any,
        ref: ForwardedRef<any>
    ) => {
        return (
            <Form.Group
                controlId={name}
                ref={ref}
                className={error ? "has-error" : ""}
            >
                <Form.ControlLabel>
                    <Text weight="bold">
                        <HStack>
                            {label}
                            {required && (
                                <Text
                                    size="xxl"
                                    weight="bold"
                                    className="text-red-500"
                                >
                                    *
                                </Text>
                            )}
                        </HStack>
                    </Text>
                </Form.ControlLabel>
                <Form.Control
                    name={name}
                    accepter={accepter}
                    errorMessage={error}
                    {...rest}
                />
                {message && <Form.HelpText>{message}</Form.HelpText>}
            </Form.Group>
        );
    }
);
export default Field;
