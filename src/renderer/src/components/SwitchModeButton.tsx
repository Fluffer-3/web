import { Avatar, Tooltip } from "@mantine/core";
import { useAppMode } from "@renderer/hooks";
import classNames from "classnames";

const SwitchModeButton = () => {
    const { appMode, changeAppMode } = useAppMode();

    return (
        <>
            <Tooltip
                position="right"
                color="gray"
                label={`Switch to ${appMode === "servers" ? "Posts" : "Servers"}`}
            >
                <Avatar
                    variant="filled"
                    className={classNames(
                        "cursor-pointer",
                        appMode === "servers"
                            ? "border-2 border-green-500/60"
                            : "border-2 border-blue-500/60"
                    )}
                    onClick={() =>
                        changeAppMode(
                            appMode === "servers" ? "posts" : "servers"
                        )
                    }
                    size={64}
                >
                    <span className="text-sm">
                        {appMode === "servers" ? "Servers" : "Posts"}
                    </span>
                </Avatar>
            </Tooltip>
        </>
    );
};

export default SwitchModeButton;
