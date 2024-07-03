import { ProgressSpinner } from "primereact/progressspinner";

const APILoading = () => {
    return (
        <div className="flex flex-col justify-center items-ceter h-screen">
            <div className="flex justify-center items-center">
                <img src="/logo.png" alt="Fluffer logo" className="w-32 h-32" />
            </div>
            <div className="flex justify-center items-center">
                <ProgressSpinner
                    style={{ width: "50px", height: "50px" }}
                    strokeWidth="6"
                    animationDuration=".5s"
                />
            </div>
            <div className="text-center font-bold text-2xl mt-5">Fluffer</div>
            <div className="text-center text-xl mt-5">😃 Loading... 😃</div>
        </div>
    );
};

export default APILoading;
