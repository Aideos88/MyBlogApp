import { useState } from "react"
import { PROFILE_URL, SIGNUP_URL, getToken } from "../../services/commonService";

const Login = () => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const enterClick = () => {
        getToken(username, password);
    }

    const registrBtnClick = () => {
        window.location.href = SIGNUP_URL;
    }

    return (
        <div>
            <p>Login</p>
            <input type='text' onChange={e => setUserName(e.target.value)} />
            <p>Password</p>
            <input type='password' onChange={e => setPassword(e.target.value)} />
            <button className="btn btn-primary" onClick={enterClick}>Enter</button>
            <button className="btn btn-link" onClick={registrBtnClick}>Зарегистрироваться</button>
        </div>
    );
}

export default Login;