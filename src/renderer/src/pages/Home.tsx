import { useAuth } from "../hooks";
import { Button } from "primereact/button";

const HomePage = () => {
    const { logout } = useAuth();

    return <Button onClick={() => logout()} label="Logout" />;
};

export default HomePage;
