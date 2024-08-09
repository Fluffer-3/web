import { useMutation } from "@apollo/client";
import { CreateServer } from "@renderer/gql/servers";
import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AvatarEditor from "react-avatar-edit";
import { Button, Input, Modal, TextInput } from "@mantine/core";

const CreateServerDialog = ({ visible, setVisible, setModalType }: any) => {
    const navigate = useNavigate();

    const [fields, setFields] = useState<Record<string, string>>({
        name: ""
    });

    const [file, setFile] = useState<File | null>(null);
    const [thumbnail, setThumbnail] = useState<string | null>(null);

    const [errors, setErrors] = useState<Record<string, string | null>>({
        name: null,
        file: null
    });

    const [createServer] = useMutation(CreateServer, {
        update: (_, { data: { createServer: serverData } = {} }) => {
            setErrors({
                name: null,
                file: null
            });

            navigate(`/servers/${serverData.id}`);

            closeModal();
        },
        onError: (error) => {
            const errs = error.graphQLErrors[0].extensions?.errors as any[];
            if (!errs) return;
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
            setFields({ name: "" });
            setErrors({ name: null });
            setThumbnail(null);
        }, 1000);
    };

    const onChange = (e: any) => {
        setFields((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const onUpload = (file: any) => {
        setFile(file);
        setThumbnail(URL.createObjectURL(file));
    };

    const onClose = () => {
        setThumbnail("");
    };

    const onSubmit = () => {
        createServer({
            variables: {
                name: fields.name,
                icon: file
            }
        });
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
                        Create a server
                    </h2>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body className="flex flex-col gap-4 justify-center items-center">
                    <div className="flex flex-col items-center justify-center gap-4">
                        <div className="flex items-center w-full justify-center">
                            {thumbnail ? (
                                <div className="relative">
                                    <MdClose
                                        className="absolute top-0 right-0"
                                        onClick={() => setThumbnail(null)}
                                    />
                                    <img
                                        className="w-[96px] h-[96px] rounded-full"
                                        src={thumbnail}
                                        alt="thumbnail"
                                    />
                                </div>
                            ) : (
                                <AvatarEditor
                                    width={96}
                                    height={96}
                                    label={
                                        <div className="text-white text-sm flex flex-col items-center">
                                            <FaCamera size="1.5em" />
                                            <span>Upload</span>
                                        </div>
                                    }
                                    onFileLoad={onUpload}
                                    onClose={onClose}
                                    borderStyle={{
                                        border: "dashed 1px #ccc",
                                        borderRadius: "50%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                    mimeTypes="image/*"
                                />
                            )}
                        </div>
                        <div className="flex flex-col justify-start items-start gap-1">
                            <Input.Label required size="md">
                                Server Name
                            </Input.Label>
                            <TextInput
                                name="name"
                                value={fields.name}
                                onChange={onChange}
                                className="mb-4"
                            />
                            {errors.name && (
                                <Input.Error>{errors.name}</Input.Error>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2">
                        <Button onClick={onSubmit} color="green" size="md">
                            Create
                        </Button>
                        <Button
                            onClick={() => setModalType("join")}
                            variant="transparent"
                        >
                            or join a server
                        </Button>
                    </div>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

export default CreateServerDialog;
