import {Link} from "react-router-dom";


export default function Login(){
    return <main>
        <h1>로그인</h1>

        <form id="login-form">
            <label htmlFor="username">아이디</label>
            <input id="username" name="username" ></input>
            <label htmlFor="password">비밀번호</label>
            <input id="password" name="password" type="password"></input>
            <p id="login=message" role="alert" hidden></p>
            <button type="submit">로그인</button>
        </form> 
    </main>
}