import { ACCOUNT_URL, LOGIN_URL, PROFILE_URL, sendRequestWithToken } from "./commonService";

export async function getUser() {
    var user = await sendRequestWithToken(ACCOUNT_URL, 'GET');
    return user;
}

export async function updateUser(user) {
    user.photo = user.photo.toString()
    var newUser = await sendRequestWithToken(ACCOUNT_URL, 'PATCH', user);
    window.location.href = PROFILE_URL;
    return newUser;
}

export async function createUser(user) {
    user.photo = user.photo.toString()
    var newUser = await sendRequestWithToken(ACCOUNT_URL, 'POST', user, false);
    window.location.href = LOGIN_URL;
    return newUser;
}

export function exitFromProfile() {
    const userAnswer = window.confirm("Вы действительно хотите выйти?");
    if (userAnswer) {
        localStorage.clear();
        window.location.href = LOGIN_URL;
    }
}