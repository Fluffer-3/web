import { useMutation } from "@apollo/client";
import { Button, Input, Modal, TextInput } from "@mantine/core";
import { JoinServer } from "@renderer/gql/servers";
import { useState } from "react";

const JoinServerDialog = ({ visible, setVisible, setModalType }: any) => {
    const [code, setCode] = useState<string>("");

    const [joinServer] = useMutation(JoinServer, {
        variables: { code },
        update: () => {
            setError(null);
        },
        onError: (error) => {
            const errs = error.graphQLErrors[0].extensions?.errors as any[];
            if (!errs) return;
            errs.forEach((err) => {
                setError(err.message);
            });
        }
    });

    const [error, setError] = useState<string | null>(null);

    const closeModal = () => {
        setVisible(false);
    };

    return (
        <Modal.Root
            opened={visible}
            onClose={() => closeModal()}
            centered
            size="md"
        >
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header className="flex justify-between items-center">
                    <h2 className="flex-1 ml-8 text-center text-xl font-semibold">
                        Join a server
                    </h2>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body className="flex justify-center flex-col gap-2 items-center">
                    <div className="flex flex-col justify-center px-10 items-start gap-1">
                        <Input.Label required size="md">
                            Invite Code/Link
                        </Input.Label>
                        <TextInput
                            onChange={(e) => setCode(e.target.value)}
                            name="code"
                            className="mb-4"
                            value={code}
                        />
                        {error && <Input.Error>{error}</Input.Error>}
                    </div>
                    <div className="flex flex-col justify-center items-center gap-2">
                        <Button
                            onClick={() => joinServer()}
                            color="green"
                            size="md"
                        >
                            Join
                        </Button>
                        <Button
                            variant="transparent"
                            onClick={() => setModalType("create")}
                        >
                            or create a server
                        </Button>
                    </div>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

export default JoinServerDialog;
