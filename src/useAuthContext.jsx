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

    async function logout(){
        const response = await fetch(
            `http://127.0.0.1:8080/api/user/logout`,
            {
                method:"POST",
                headers : {
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                }
            });
        console.log(response+"로그아웃성공")
        if(response.status!=204){
            const result = await response.json().catch(()=>null);
            console.log(result)
            if(!response.ok||!result?.success){
                throw new Error(result?.message||"로그아웃에 실패했습니다");
            }
        }
        clearAuth();
        }

    return <AuthContext.Provider value={{token, login, clearAuth, logout}}>{children}</AuthContext.Provider>
}

export function useAuthContext(){
    return useContext(AuthContext);
}