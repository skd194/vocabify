import http from "../httpService";
import jwtDecode from "jwt-decode";
import * as models from "./models";

const apiUrl = "/auth";
const tokenKey = "token";

const login = async (request: models.ILoginRequest) => {
  debugger;
  try {
    const { data } = await http.post<models.ILoginResponse>(
      `${apiUrl}/login`,
      request
    );
    setToken(data.token);
    return data;
  } catch (ex) {

    var a = ex;
    debugger;
  }
};

const logout = () => {
  localStorage.removeItem(tokenKey);
};

const setToken = (jwt: string) => {
  localStorage.setItem(tokenKey, jwt);
};

const currentUser = () => {
  const jwt = localStorage.getItem(tokenKey);
  if (!jwt) return;
  try {
    return jwtDecode(jwt);
  } catch {
    return null;
  }
};

const getJwt = () => {
  return localStorage.getItem(tokenKey);
};

const auth = {
  login,
  logout,
  currentUser,
  setToken,
  getJwt,
};

export default auth;
