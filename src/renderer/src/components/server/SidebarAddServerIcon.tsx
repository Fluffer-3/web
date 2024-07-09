import { BiPlus } from "react-icons/bi";
import { FormEvent, useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { CreateServer } from "@renderer/gql/servers";
import {
    Button,
    Container,
    Form,
    HStack,
    IconButton,
    Message,
    Modal,
    Text,
    Uploader,
    useToaster,
    VStack
} from "rsuite";
import { FileType } from "rsuite/esm/Uploader";
import Field from "@renderer/components/Field";
import { CreateServerSchema } from "@renderer/ValidationSchemas";
import { useNavigate } from "react-router-dom";

const SidebarAddServerButton = () => {
    const formRef = useRef<any>();
    const toaster = useToaster();
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);

    const [fields, setFields] = useState<Record<string, string | null>>({
        name: null
    });

    const [file, setFile] = useState<File | null>(null);
    const [thumbnail, setThumbnail] = useState("");

    const [errors, setErrors] = useState<Record<string, string | null>>({
        name: null,
        file: null
    });

    const [createServer] = useMutation(CreateServer, {
        update: (_, { data: { createServer: serverData } = {} }) => {
            setErrors({
                name: null
            });

            // Do something with the server data
            console.log(serverData);

            toaster.push(
                <Message type="success">
                    Server <strong>{serverData.name}</strong> created
                    successfully
                </Message>
            );

            closeModal();
        },
        onError: (error) => {
            const errs = error.graphQLErrors[0].extensions.errors as any[];
            errs.forEach((err) => {
                setErrors((prev) => ({
                    ...prev,
                    [err.type]: err.message
                }));
            });
        }
    });

    const closeModal = () => {
        setVisible(false);
        setTimeout(() => {
            setFields({ name: null });
            setErrors({ name: null });
            setFile(null);
            setThumbnail("");
        }, 1000);
    };

    const onChange = (_: any, e: any) => {
        setFields((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const onUpload = (file: FileType) => {
        if (!file.blobFile) return;
        setFile(file.blobFile);
        setThumbnail(URL.createObjectURL(file.blobFile));
    };

    const onSubmit = (e?: FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        createServer({
            variables: {
                name: fields.name,
                icon: file
            }
        });
    };

    return (
        <>
            <Modal
                open={visible}
                onExit={() => closeModal()}
                onClose={() => closeModal()}
                onOpen={() => setVisible(true)}
                size="xs"
            >
                <Modal.Header>
                    <HStack alignItems="center" justifyContent="center">
                        <Text weight="bold" size="lg">
                            Create a server
                        </Text>
                    </HStack>
                </Modal.Header>
                <Modal.Body style={{ overflow: "hidden" }}>
                    <Form
                        model={CreateServerSchema}
                        onCheck={setErrors}
                        onSubmit={(_, e) => onSubmit(e)}
                    >
                        <VStack
                            spacing={30}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Uploader
                                ref={formRef}
                                action=""
                                method="get"
                                onUpload={onUpload}
                                autoUpload
                                accept="image/*"
                                multiple={false}
                                fileListVisible={false}
                                draggable
                                listType="picture"
                            >
                                {thumbnail ? (
                                    <img
                                        src={thumbnail}
                                        className="w-full h-full"
                                    />
                                ) : (
                                    <BiPlus />
                                )}
                            </Uploader>
                            <VStack spacing={2}>
                                <Field
                                    name="name"
                                    label="Server name"
                                    value={fields.name}
                                    error={errors.name}
                                    onChange={onChange}
                                    required
                                    autocomplete="off"
                                />
                            </VStack>
                            <Container>
                                <Button
                                    appearance="primary"
                                    color="green"
                                    type="submit"
                                >
                                    Create
                                </Button>
                            </Container>
                        </VStack>
                    </Form>
                </Modal.Body>
            </Modal>
            <IconButton
                circle
                size="lg"
                className="w-14 h-14"
                onClick={() => setVisible(true)}
                icon={<BiPlus size="1.5em" className="text-green-500" />}
            />
        </>
    );
};

export default SidebarAddServerButton;
