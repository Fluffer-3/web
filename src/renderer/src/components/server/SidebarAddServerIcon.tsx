import { BiPlus } from "react-icons/bi";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CreateServer } from "@renderer/gql/servers";

import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import AvatarEditor from "react-avatar-edit";
import { FaCamera } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { classNames } from "primereact/utils";

const SidebarAddServerButton = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);

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
            const errs = error.graphQLErrors[0].extensions.errors as any[];
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

    const modalHeader = (
        <div className="flex items-center justify-center">
            <h2 className="text-xl font-semibold">Create a server</h2>
        </div>
    );

    const modalFooter = (
        <div className="flex justify-center">
            <Button
                label="Create"
                className="w-24"
                onClick={onSubmit}
                severity="success"
            />
        </div>
    );

    return (
        <>
            <Dialog
                visible={visible}
                onHide={() => closeModal()}
                onShow={() => setVisible(true)}
                style={{ width: "400px" }}
                header={modalHeader}
                draggable={false}
                footer={modalFooter}
            >
                <div className="flex flex-col gap-4 justify-center items-center">
                    <div className="flex flex-col items-center justify-center gap-4">
                        <div
                            className={classNames(
                                "flex items-center w-full justify-center"
                            )}
                        >
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
                        <div className="flex flex-col justify-center items-center">
                            <InputText
                                name="name"
                                value={fields.name}
                                onChange={onChange}
                                className="mb-4"
                                placeholder="Server name"
                            />
                            {errors.name && (
                                <span className="text-red-500 text-sm">
                                    {errors.name}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </Dialog>
            <Button
                className="w-16 h-16 bg-neutral-700 border-green-500"
                outlined
                rounded
                onClick={() => setVisible(true)}
                icon={<BiPlus size="1.5em" className="text-green-500" />}
            />
        </>
    );
};

export default SidebarAddServerButton;

/**
 *   <Field
                            name="name"
                            label="Server name"
                            value={fields.name}
                            error={errors.name}
                            onChange={onChange}
                            required
                            autoComplete="off"
                        />
 */
