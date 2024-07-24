import { Avatar } from "primereact/avatar";
import { PropsWithChildren } from "react";

const Logo = (props: PropsWithChildren) => {
    return <Avatar className="bg-transparent" image="/logo.png" {...props} />;
};

export default Logo;
