import ErrorMessage from "../components/ErrorMessage";

const NotFound = () => {
    return (
        <ErrorMessage
            message="What are you doing here?"
            subtext="It seems you've stumbled upon a page that doesn't exist"
        />
    );
};

export default NotFound;
