export const ACCOUNT_URL = 'account';
export const USERS_URL = 'users';
export const NEWS_URL = 'news';

const BASE_URL = 'login';
const TOKEN_NAME = 'Token';

export const PROFILE_URL = '/profile';
export const LOGIN_URL = '/login';
export const SIGNUP_URL = '/signup'


export async function getToken(login, password) {
    const url = ACCOUNT_URL + '/token';
    const token = await sendAuthenticatedRequest(url, 'POST', login, password);

    localStorage.setItem(TOKEN_NAME, token.accessToken);
    window.location.href = PROFILE_URL;
}

async function sendAuthenticatedRequest(url, method, username, password, data) {
    //создаем объект заголовка
    var headers = new Headers();

    //устанавливаем заголовок авторизации
    headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));

    //устанавливаем тип контента (если есть данные)
    if (data) {
        headers.set('Content-Type', 'application/json');
    }

    //создаем объект параметров запроса
    var requestOptions = {
        method: method,
        headers: headers,
        body: data ? JSON.stringify(data) : undefined
    };

    //отправка запроса с помощью fetch
    var resultFetch = await fetch(url, requestOptions);
    if (resultFetch.ok) {
        return resultFetch.json();
    } else {
        throw new Error('Ошибка ' + resultFetch.status + ': ' + resultFetch.statusText);
    }
}

export async function sendRequestWithToken(url, method, data, withToken = true) {
    var headers = new Headers();


    if (withToken) {
        const token = localStorage.getItem(TOKEN_NAME);
        headers.set('Authorization', `Bearer ${token}`);
    }

    if (data) {
        headers.set('Content-Type', 'application/json');
    }
    
    var requestOptions = {
        method: method,
        headers: headers,
        body: data ? JSON.stringify(data) : undefined
    };

    var resultFetch = await fetch(url, requestOptions);
    if (resultFetch.ok) {
        return resultFetch.json();
    } else {
        errorReques(resultFetch.status);
    }
}

function errorReques(status) {
    if (status === 401) {
        window.location.href = BASE_URL;
    }
}