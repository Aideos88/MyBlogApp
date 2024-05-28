import { useState } from "react";
import { getUsersByName } from "../../services/usersService"
import ShortUserView from "./UserShortView";
import { LOGIN_URL, isUserOnline } from "../../services/commonService";
import "../../custom.css"

const SearchUser = () => {

    const [users, setUsers] = useState([]);

    if (!isUserOnline()) window.location.href = LOGIN_URL;

    const getUsers = async (userName) => {
        if (userName === '') return;
        try {
            const allUsers = await getUsersByName(userName);
            setUsers(allUsers);
        }
        catch {
            return;
        }
    }

    return (
        <div>
            <input type="text" onChange={e => getUsers(e.target.value)} />
            {
                users !== undefined ?
                    users.map(x => <ShortUserView user={x} />)
                    :
                    <p>Пользователь не найден</p>}
        </div>
    )
}

export default SearchUser;