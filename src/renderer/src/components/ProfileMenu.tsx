import { Avatar } from "rsuite";
import { useAuth } from "../hooks";

export const ProfileMenu = () => {
    const { user } = useAuth();

    if (!user) return <></>;

    return (
        <Avatar
            circle
            src={user.avatarUrl ?? ""}
            className="w-12 h-12"
            alt={
                user.globalName?.substring(0, 1).toUpperCase() ??
                user.username.substring(0, 1).toUpperCase()
            }
        />
    );
};

export default ProfileMenu;
