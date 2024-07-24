import { useAppMode } from "@renderer/hooks";
import { Avatar } from "primereact/avatar";
import { Tooltip } from "primereact/tooltip";
import { classNames } from "primereact/utils";

const SwitchModeButton = () => {
    const { appMode, changeAppMode } = useAppMode();

    return (
        <>
            <Tooltip
                target=".switch-mode-button"
                content={`Switch to ${appMode === "servers" ? "Posts" : "Servers"}`}
                position="mouse"
                event="both"
                mouseTrack
            />
            <Avatar
                shape="circle"
                label={appMode === "servers" ? "Servers" : "Posts"}
                className={classNames(
                    "w-16 h-16 bg-neutral-700/[.9] cursor-pointer switch-mode-button",
                    appMode === "servers"
                        ? "border-2 border-green-500"
                        : "border-2 border-blue-500"
                )}
                onClick={() =>
                    changeAppMode(appMode === "servers" ? "posts" : "servers")
                }
            />
        </>
    );
};

export default SwitchModeButton;
