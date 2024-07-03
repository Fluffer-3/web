import { Toolbar as PToolbar } from "primereact/toolbar";
import SearchBar from "./SearchBar";
import ProfileMenu from "./ProfileMenu";
import { useAppMode } from "../hooks";

const Toolbar = () => {
    const { appMode } = useAppMode();

    const logo = <img src="/logo.png" className="w-16 h-16 rounded-full" />;

    return (
        <PToolbar
            start={logo}
            center={<SearchBar />}
            end={<ProfileMenu />}
            pt={{
                root: {
                    style: {
                        padding: "3px",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        borderRadius: 0
                    }
                }
            }}
            className={`w-full shadow-2xl bg-neutral-700/[.2] ${
                appMode === "posts"
                    ? "border-b border-b-blue-500 border-l border-l-blue-500"
                    : "border-b border-b-green-500 border-l border-l-green-500"
            }`}
        />
    );
};

export default Toolbar;
