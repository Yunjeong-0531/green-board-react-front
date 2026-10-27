import {Link} from "react-router-dom";
import { useAuthContext } from "../useAuthContext";

export default function AuthMenu(){
    const {token, clearAuth} = useAuthContext();
    

    function plus(a, b) {
        return a + b;
    }
    const plus2 = (a, b) => {
        console.log(a+b);
        return a + b;
    }

    const plus3 = (a,b) => a + b;

    function anonymous() {
        clearAuth();
    }
    return <>
        {!token&& <Link className="login-link" to="/login">로그인</Link>}
        {token&& <button className="logout-button" type="button" onClick={()=>clearAuth()}>로그아웃</button>}
    </>
}

