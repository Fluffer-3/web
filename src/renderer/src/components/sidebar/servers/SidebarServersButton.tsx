import { Button } from "primereact/button";
import { SidebarServersButtonProps } from "@renderer/@types";
import { Avatar } from "primereact/avatar";

const SidebarServersButton = (props: SidebarServersButtonProps) => {
    const { server } = props;

    if (!server)
        return (
            <Button
                tooltip={props.label}
                icon={props.icon}
                className="h-12 w-12 text-white bg-neutral-700 hover:bg-neutral-600"
                text
                rounded
                severity="success"
            />
        );

    return (
        <Button
            tooltip={server.name}
            className={`h-12 w-12 text-white ${
                !server.icon ? "bg-neutral-700 hover:bg-neutral-800" : ""
            }`}
            text
            rounded
            icon={
                <Avatar
                    label={server.nameAcronym}
                    image={server.iconUrl || undefined}
                    className="bg-transparent"
                />
            }
            severity="success"
        />
    );
};

export default SidebarServersButton;
