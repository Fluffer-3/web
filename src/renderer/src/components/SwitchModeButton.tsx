import { useAppMode } from "@renderer/hooks";
import { Whisper, Tooltip, Avatar, Text } from "rsuite";

const SwitchModeButton = () => {
    const { appMode, changeAppMode } = useAppMode();

    return appMode === "posts" ? (
        <Whisper
            trigger="hover"
            placement="right"
            speaker={
                <Tooltip>
                    <Text size="lg">Switch to servers</Text>
                </Tooltip>
            }
        >
            <Avatar
                circle
                className="w-14 h-14 border border-blue-500 bg-neutral-700/[.9] cursor-pointer"
                onClick={() => changeAppMode("servers")}
            >
                <Text weight="bold" size={13}>
                    Posts
                </Text>
            </Avatar>
        </Whisper>
    ) : (
        <Whisper
            trigger="hover"
            placement="right"
            speaker={
                <Tooltip>
                    <Text size="lg">Switch to posts</Text>
                </Tooltip>
            }
        >
            <Avatar
                circle
                className="w-14 h-14 border border-green-500 bg-neutral-700/[.9] cursor-pointer"
                onClick={() => changeAppMode("posts")}
            >
                {" "}
                <Text weight="bold" size={13}>
                    Servers
                </Text>
            </Avatar>
        </Whisper>
    );
};

export default SwitchModeButton;
