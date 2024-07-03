import { Button } from "primereact/button";
import { SidebarPostsButtonProps } from "@renderer/@types";
import { Avatar } from "primereact/avatar";

const SidebarPostsButton = (props: SidebarPostsButtonProps) => {
    const { user } = props;

    if (!user)
        return (
            <Button
                tooltip={props.label}
                icon={props.icon}
                className="h-12 w-12 text-white bg-neutral-700 hover:bg-neutral-600"
                text
                rounded
            />
        );

    return (
        <Button
            tooltip={user.globalName || user.username}
            className={`h-12 w-12 text-white ${
                !user.avatar ? "bg-neutral-700 hover:bg-neutral-800" : ""
            }`}
            text
            rounded
            icon={
                <Avatar
                    label={user.username}
                    image={user.avatarUrl || undefined}
                    className="bg-transparent"
                />
            }
        />
    );
};

export default SidebarPostsButton;
