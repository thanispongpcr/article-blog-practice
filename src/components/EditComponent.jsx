import { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getUser, getToken } from "../services/authorize";
import EditRoundedIcon from '@mui/icons-material/EditRounded';

const EditComponent = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    title: "",
    author: "",
    slug: "",
  });
  const { slug: routeSlug } = useParams();

  const { title, author, slug } = state;

  const [content, setContent] = useState("");
  const submitContent = (e) => {
    setContent(e);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/blog/${routeSlug}`
        );
        const { title, content, author, slug: responseSlug } = response.data;
        setState({ ...state, title, author, slug: responseSlug });
        setContent(content);
      } catch (error) {
        console.log(error.response.data.error);
        navigate("/")
      }
    };

    fetchData();
  }, [routeSlug]);

  useEffect(() => {
    !getUser() && navigate("/login");
  }, []);

  const showUpdateForm = () => (
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
          <EditRoundedIcon /> Edit
        </button>
      </div>
    </form>
  );

  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/blog/${routeSlug}`,
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
        text: "อัพเดตบทความเรียบร้อย",
        icon: "success",
      });
      const {
        title: responseTitle,
        content: responseContent,
        author: responseAuthor,
        slug: responseSlug,
      } = response.data;
      setState({
        ...state,
        title: responseTitle,
        author: responseAuthor,
        slug: responseSlug,
      });
      setContent(content);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <NavbarComponent />
      <div className="container pt-3">
        <h2>Edit Article</h2>
        {showUpdateForm()}
      </div>
    </>
  );
};
export default EditComponent;