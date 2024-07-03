import { ButtonProps } from "primereact/button";
import { Nullable } from "primereact/ts-helpers";

declare type LoginCredentials = {
    usernameOrEmail: string;
    password: string;
};

declare type RegisterCredentials = {
    email: string;
    username: string;
    displayName: string | null;
    password: string;
    confirmPassword: string;
};

declare type LoginErrors = {
    username?: string | null;
    email?: string | null;
    password?: string | null;
};

declare type RegisterErrors = {
    email?: string | null;
    username?: string | null;
    displayName?: string | null;
    password?: string | null;
    confirmPassword?: string | null;
};

declare type AuthContextType = {
    user?: User | null;
    isLoggedIn: boolean;
    login: (userData: any) => void;
    logout: () => void;
};

declare type AppModeContextType = {
    appMode: "servers" | "posts";
    setAppMode: (appMode: "servers" | "posts") => void;
    changeAppMode: (appMode: "servers" | "posts") => void;
};

declare type User = {
    id: string;
    username: string;
    email: string;
    globalName?: string | null;
    avatar?: string | null;
    avatarUrl?: string | null;
    bio?: string | null;
    createdAt: string;
    createdTimestamp: number;
    updatedAt: string;
    updatedTimestamp: number;
};

declare type UserWithToken = User & {
    token: string;
};

declare type SidebarServersButtonProps = ButtonProps & {
    server?: Server;
};

declare type SidebarPostsButtonProps = ButtonProps & {
    user?: User;
};

declare type Server = {
    id: string;
    name: string;
    nameAcronym: string;
    icon?: string | null;
    iconUrl?: string | null;
};
