import { useQuery } from "@apollo/client";
import { Avatar, Modal, Table } from "@mantine/core";
import { GetServerInvites } from "@renderer/gql/servers";
import { useEffect, useState } from "react";
import moment from "moment";

const ServerInvitesDialog = ({ server, visible, setVisible }) => {
    const [invites, setInvites] = useState<any[]>([]);

    const {
        loading,
        data: { getServerSettings: { invites: serverInvites } = [] } = []
    } = useQuery(GetServerInvites, {
        variables: { id: server.id }
    });

    useEffect(() => {
        if (!loading) {
            setInvites(serverInvites);
        }
    });

    console.log(invites);
    return (
        <Modal.Root
            opened={visible}
            onClose={() => setVisible(false)}
            centered
            size="auto"
        >
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header>
                    <div className="flex justify-center items-center">
                        {server.icon ? (
                            <Avatar
                                src={server.icon}
                                size="md"
                                className="mr-2"
                            />
                        ) : (
                            <Avatar size="md" className="mr-2">
                                {server.nameAcronym}
                            </Avatar>
                        )}
                        <h2 className="text-xl font-semibold">
                            {server.name} Invites
                        </h2>
                    </div>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                    <Table
                        verticalSpacing="sm"
                        horizontalSpacing="xl"
                        highlightOnHover
                        withTableBorder
                        withRowBorders
                    >
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Invite Code</Table.Th>
                                <Table.Th>Uses</Table.Th>
                                <Table.Th>Max Uses</Table.Th>
                                <Table.Th>Expires</Table.Th>
                                <Table.Th>Created by</Table.Th>
                                <Table.Th>Created</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {invites.map((invite, i) => (
                                <Table.Tr key={i}>
                                    <Table.Td>{invite.code}</Table.Td>
                                    <Table.Td>{invite.uses}</Table.Td>
                                    <Table.Td>{invite.maxUses}</Table.Td>
                                    <Table.Td>
                                        {invite.expiresAt
                                            ? moment(invite.expiresAt).fromNow()
                                            : "Never"}
                                    </Table.Td>
                                    <Table.Td>
                                        {invite.createdBy.globalName ??
                                            invite.createdBy.username}
                                    </Table.Td>
                                    <Table.Td>
                                        {moment(invite.createdAt).fromNow()}
                                    </Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

export default ServerInvitesDialog;
