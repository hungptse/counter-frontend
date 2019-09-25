const BASE_URL = "http://http://23.101.5.241:3333/api";
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