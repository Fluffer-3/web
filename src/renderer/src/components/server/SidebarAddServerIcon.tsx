import { BiPlus } from "react-icons/bi";
import { useState } from "react";

import CreateServerDialog from "./CreateServerDialog";
import JoinServerDialog from "./JoinServerDialog";
import { ActionIcon } from "@mantine/core";

const SidebarAddServerButton = () => {
    const [visible, setVisible] = useState(false);

    const [modalType, setModalType] = useState<"create" | "join">("join");

    return (
        <>
            {modalType === "create" && (
                <CreateServerDialog
                    visible={visible}
                    setVisible={setVisible}
                    setModalType={setModalType}
                />
            )}
            {modalType === "join" && (
                <JoinServerDialog
                    visible={visible}
                    setVisible={setVisible}
                    setModalType={setModalType}
                />
            )}
            <ActionIcon
                onClick={() => {
                    setModalType("join");
                    setVisible(true);
                }}
                variant="outline"
                color="green"
                size={52}
                radius="xl"
            >
                <BiPlus size="1.5em" />
            </ActionIcon>
        </>
    );
};

export default SidebarAddServerButton;
