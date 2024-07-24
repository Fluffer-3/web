import { useParams } from "react-router-dom";

const ServerPage = () => {
    const { serverId } = useParams();

    if (!serverId) return <div>Woah!</div>;

    return <div>Servers</div>;
};

export default ServerPage;
