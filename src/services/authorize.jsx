
const authenticate = (respones, next) => {
  if (window !== "undefined") {

    sessionStorage.setItem("token", JSON.stringify(respones.data.token));
    sessionStorage.setItem("username", JSON.stringify(respones.data.username));
  }
  next();
};


export const getToken = () => {
  if (window !== "undefined") {
    if (sessionStorage.getItem("token")) {
      return JSON.parse(sessionStorage.getItem("token"));
    } else {
      return false;
    }
  }
};


export const getUser = () => {
  if (window !== "undefined") {
    if (sessionStorage.getItem("username")) {
      return JSON.parse(sessionStorage.getItem("username"));
    } else {
      return false;
    }
  }
};


export const logout = (next) => {
  if (window !== "undefined") {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
  }
  next();
};


export default authenticate;
