const ErrorMessage = ({
    message,
    subtext
}: {
    message: string;
    subtext?: string | string[];
}) => (
    <div className="flex container h-screen m-auto">
        <div className="flex flex-col justify-center m-auto items-center">
            <h2 className="text-2xl font-bold">{message}</h2>
            {subtext &&
                (Array.isArray(subtext) ? (
                    subtext.map((text, i) => (
                        <p className="text-lg" key={i}>
                            {text}
                        </p>
                    ))
                ) : (
                    <p className="text-lg">{subtext}</p>
                ))}
        </div>
    </div>
);

export default ErrorMessage;
