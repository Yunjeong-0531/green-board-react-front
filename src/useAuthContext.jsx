import { createContext, useState,useContext } from "react";

const AuthContext = createContext(null);


//토큰 관리
//로그인 로그아웃 처리

export function AuthProvider({children}){
    const [token, setToken] = useState(()=>localStorage.getItem("accessToken"));
    
    function login(accessToken){
        localStorage.setItem("accessToken", accessToken);
        setToken(accessToken);
        console.log(token);
    }

    function clearAuth(){
        localStorage.removeItem("accessToken");
        setToken(null);
    }

    return <AuthContext.Provider value={{token, login, clearAuth}}>{children}</AuthContext.Provider>
}

export function useAuthContext(){
    return useContext(AuthContext);
}