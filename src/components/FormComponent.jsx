import  { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate} from "react-router-dom";
import { getUser, getToken } from "../services/authorize";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

const FormComponent = () => {
  const [state, setState] = useState({
    title: "",
    author: getUser(),
  });

  const { title, author } = state;

  const [content, setContent] = useState("");

  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const submitContent = (e) => {
    setContent(e);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/create`,
        {
          title,
          content,
          author,
        },
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      );
      Swal.fire({
        title: "แจ้งเตือน",
        text: "บันทึกข้อมูลบทความเรียบร้อย",
        icon: "success",
      });
      setState({ ...state, title: "", author: "" });
      setContent("");
    } catch (error) {
      Swal.fire({
        title: "แจ้งเตือน",
        text: error.response.data.error,
        icon: "error",
      });
    }
  };
  
  const navigate = useNavigate();
  useEffect(() => {
    !getUser() && navigate("/login");
  }, []);
  return (
    <>
      <NavbarComponent />
      <div className="container pt-3">
        <h2>Create an Article</h2>
        <form onSubmit={submitForm}>
          <div className="form-group">
            <label>Article Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={inputValue("title")}
            />
          </div>
          <div className="form-group">
            <label>Details</label>
            <ReactQuill
              value={content}
              onChange={submitContent}
              theme="snow"
              className="pb-5 mb-3"
              placeholder="Write Article Details"
              style={{ border: "1px solid #666" }}
            />
          </div>
          <div className="form-group">
            <label>Author</label>
            <input
              type="text"
              className="form-control"
              value={author}
              onChange={inputValue("author")}
            />
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button type="submit" className="btn btn-outline-secondary mt-2">
              <AddCircleOutlineRoundedIcon /> Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default FormComponent;
