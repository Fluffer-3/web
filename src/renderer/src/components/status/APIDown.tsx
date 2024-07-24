import Logo from "../Logo";

const APIDown = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <Logo />
            <span>Fluffer</span>
            <span>😢 Server is down 😢</span>
        </div>
    );
};

export default APIDown;
