import {Link, useNavigate} from "react-router-dom";
import { useAuthContext } from "../useAuthContext";
import { addTransitionType } from "react";

export default function AuthMenu({onStatus}){
    const {token, logout} = useAuthContext();
    const navigate = useNavigate();

    // function plus(a, b) {
    //     return a + b;
    // }
    // const plus2 = (a, b) => {
    //     console.log(a+b);
    //     return a + b;
    // }

    // const plus3 = (a,b) => a + b;

    // function anonymous() {
    //     clearAuth();
    // }

    async function handleLogout(){
        onStatus("로그아웃 중..");
        try{
            await logout();
            navigate("/login");
            onStatus("");
        }catch(error){
            onStatus(error.message);
        }
    }
    return <>
        {!token&& <Link className="login-link" to="/login">로그인</Link>}
        {token&& <button className="logout-button" type="button" onClick={handleLogout}>로그아웃</button>}
    </>
}

