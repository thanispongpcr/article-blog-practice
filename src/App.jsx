import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import { Interweave } from "interweave";
import { getUser, getToken } from "./services/authorize";
import FooterComponent from "./components/FooterComponent";

function App() {
  const [blogs, setBlogs] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`);
      setBlogs(response.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const confirmDelete = async (slug) => {
    try {
      const result = await Swal.fire({
        title: "คุณต้องการลบบทความหรือไม่",
        icon: "warning",
        showCancelButton: true,
      });

      if (result.isConfirmed) {
        deleteBlog(slug);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const deleteBlog = async (slug) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/blog/${slug}`, {
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      });
      Swal.fire({
        title: "Deleted",
        text: "ลบบทความเรียบร้อย",
        icon: "success",
      });
      fetchData();
    } catch (error) {
      console.log("เกิดข้อผิดพลาด", error);
    }
  };

  return (
    <>
      <NavbarComponent />
      <div className="container">
        {blogs.map((blog, index) => (
          <div
            className="row"
            key={index}
            style={{ borderBottom: "1px solid silver" }}
          >
            <div className="col pt-3 pb-3">
              <Link to={`blog/${blog.slug}`} style={{ color: '#000' }}>
                <h2>{blog.title}</h2>
              </Link>
              <Interweave content={blog.content.substring(0, 250)} />
              <p className="text-muted">
                {blog.author}, เผยแพร่ :{" "}
                {new Date(blog.createdAt).toLocaleString()}
              </p>
              {getUser() && (
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <Link
                    to={`/blog/edit/${blog.slug}`}
                    className="btn btn-outline-secondary"
                  >
                    แก้ไขบทความ
                  </Link>
                  &nbsp;
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => confirmDelete(blog.slug)}
                  >
                    ลบบทความ
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <FooterComponent />
    </>
  );
}

export default App;
