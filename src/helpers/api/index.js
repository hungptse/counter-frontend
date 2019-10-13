import { getToken } from "../utility";

// const BASE_URL = "https://swd-backend.hangnoidiachauau.com/api";
const BASE_URL = "http://localhost:4000/api";
export const GET = async (endpoint, params = {}, headers = {} ,isAuth = false) => {
    if (isAuth) {
        headers["Authorization"] = `Bearer ${getToken()}`;
    }
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: headers,
    });
    return res.json();
};
export const POST = async (endpoint, body = {}, params = {}, headers = {}, isAuth = false) => {
    headers["Content-Type"] = "application/json";
    if (isAuth) {
        headers["Authorization"] = `Bearer ${getToken()}`;
    }
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    });
    return res.json();
};
export const PUT = async (endpoint, body = {}, params = {}, headers = {}, isAuth = false) => {
    headers["Content-Type"] = "application/json";
    if (isAuth) {
        headers["Authorization"] = `Bearer ${getToken()}`;
    }
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body)
    });
    return res.json();
};
export const DELETE = async (endpoint, body = {}, params = {}, headers = {}, isAuth = false) => {
    headers["Content-Type"] = "application/json";
    if (isAuth) {
        headers["Authorization"] = `Bearer ${getToken()}`;
    }
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify(body)
    });
    return res.json();
};
export const ENDPOINT = {
    AUTH__LOGIN: "/auth/login",
    ALL_ROLE: '/role',
    ALL_PERMISSION: '/permission',
    ALL_USER : '/user',
    STORE_OF_USER : '/user_store'
}