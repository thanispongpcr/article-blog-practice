import { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import authenticate from "../services/authorize";
import { useNavigate } from "react-router-dom";
import { getUser } from "../services/authorize";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";

const LoginComponent = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const { username, password } = state;
  const navigate = useNavigate();

  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          username,
          password,
        }
      );

      authenticate(response, () => navigate("/create"));
    } catch (error) {
      Swal.fire({
        title: "แจ้งเตือน",
        text: error.response.data.error,
        icon: "error",
      });
    }
  };

  useEffect(() => {
    getUser() && navigate("/");
  }, []);

  return (
    <>
      <NavbarComponent />
      <div className="container pt-3">
        <h1>Log in</h1>
        <form onSubmit={submitForm}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={inputValue("username")}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={inputValue("password")}
            />
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button type="submit" className="btn btn-outline-secondary mt-2">
            <LoginRoundedIcon /> Log in
          </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginComponent;
