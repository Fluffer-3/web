import { PropsWithChildren, createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/auth";
import { AuthContextType, User, UserWithToken } from "@renderer/@types";

export const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoggedIn: false,
    login: (userData: User) => userData,
    logout: () => {}
});

export function AuthProvider({ children }: PropsWithChildren) {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.auth.user);

    const loginUser = (userData: UserWithToken) => {
        const { token, ...user } = userData;
        localStorage.setItem("ff-token", token);
        dispatch(login(user));
    };

    const logoutUser = () => {
        localStorage.removeItem("ff-token");
        dispatch(logout());
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoggedIn: !!user,
                login: loginUser,
                logout: logoutUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
