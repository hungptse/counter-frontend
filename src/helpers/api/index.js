// const BASE_URL = "https://swd-backend.hangnoidiachauau.com/api";
const BASE_URL = "http://localhost:4000/api";
export const GET = async (endpoint, params = {}, headers = {}) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: headers,
    });
    return res.json();
};
export const POST = async (endpoint, body = {}, params = {}, headers = {}) => {
    headers["Content-Type"] = "application/json";
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    });
    return res.json();
};

export const ENDPOINT = {
    AUTH__LOGIN: "/auth/login",
}