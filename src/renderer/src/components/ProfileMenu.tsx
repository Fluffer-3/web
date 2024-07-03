import { Avatar } from "primereact/avatar";
import { useAuth } from "../hooks";

export const ProfileMenu = () => {
    const { user } = useAuth();

    if (!user) return <></>;

    return (
        <Avatar
            label={user.username[0].toUpperCase()}
            image={user.avatar ?? undefined}
            shape="circle"
            className="h-12 w-12"
        />
    );
};

export default ProfileMenu;
