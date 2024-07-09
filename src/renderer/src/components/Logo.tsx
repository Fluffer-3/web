import { PropsWithChildren } from "react";
import { Avatar } from "rsuite";

const Logo = (props: PropsWithChildren) => {
    return (
        <Avatar
            className="bg-transparent"
            src="/logo.png"
            size="xxl"
            circle
            {...props}
        />
    );
};

export default Logo;
