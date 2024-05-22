import { LOGIN_URL } from "../../services/commonService"
import { createUser } from "../../services/usersService"
import UserProfileCreation from "./UserProfileCreation"
import { commonUser } from "./commonUser.jsx"

const SignUp = () => {

    const signupAction = (newUser) => {
        createUser(newUser);
    }
    const openLoginPage = () => {
        window.location.href = LOGIN_URL;
    }

    return (
        <div>
            <UserProfileCreation user={commonUser} setAction={signupAction} />
            <button className="btn btn-link" onClick={openLoginPage}>Логин</button>
        </div>
    )
}

export default SignUp;