const authActons = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGOUT: 'LOGOUT',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  login: (data) => ({
    type: authActons.LOGIN_REQUEST,
    data : data
  }),
  logout: () => ({
    type: authActons.LOGOUT,
  }),
};
export default authActons;
