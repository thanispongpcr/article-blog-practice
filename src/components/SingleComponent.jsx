import axios from "axios";
import  { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import { Interweave } from "interweave";
import { useNavigate,} from "react-router-dom";

const SingleComponent = () => {
  const [blog, setBlog] = useState();
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/blog/${slug}`
        );
        setBlog(response.data);
      } catch (error) {
        console.log(error.response.data.error);
        navigate("/")
      }
    };

    fetchData();
  }, [slug]);

  return (
    <>
      <NavbarComponent />
      <div className="container pt-3">
        {blog && <h2>{blog.title}</h2>}
        {blog && <Interweave content={blog.content} />}
        {blog && (
          <p className="text-muted">
            {blog.author}, Publish : {new Date(blog.createdAt).toLocaleString()}
          </p>
        )}
      </div>
    </>
  );
};
export default SingleComponent;
