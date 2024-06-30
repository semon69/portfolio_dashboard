/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Blog.css";
import { useUpdateBlogMutation } from "../../redux/api/blogApi";
import { toast } from "sonner";
import { useLoaderData, useNavigate } from "react-router-dom";

const UpdateBlog = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [updateBlog] = useUpdateBlogMutation();
  const navigate = useNavigate();
  const blog: any = useLoaderData();

  useEffect(() => {
    if (blog?.data) {
      setTitle(blog.data.title);
      setImage(blog.data.image);
      setDescription(blog.data.description);
    }
  }, [blog]);

  const handleSubmit = async () => {
    const data = { title, image, description };
    const payload = {
      id: blog?.data?._id,
      data,
    };

    try {
      const res = await updateBlog(payload);

      if ("data" in res && res.data.success) {
        toast.success(res.data.message);
        setTitle("");
        setImage("");
        setDescription("");
        navigate("/manage-blogs");
      }
    } catch (error) {
      toast.error("Failed to update blog");
    }
  };
  return (
    <div className="container mx-auto">
      <p className="font-bold text-center text-orange-500 text-3xl">
        Write Blogs
      </p>
      <div className="border-4 p-4 shadow-xl m-2 lg:m-10 md:m-5">
        <label className="label text-lg md:text-base sm:text-sm font-bold">
          <span className="label-text text-orange-500">Title</span>
        </label>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full"
          //   defaultValue={blog?.data?.title}
        />
        <label className="label text-lg md:text-base sm:text-sm font-bold">
          <span className="label-text text-orange-500">Image</span>
        </label>
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="input input-bordered w-full mb-2"
          //   defaultValue={blog?.data?.image}
        />
        <div className="custom-quill">
          <ReactQuill
            value={description}
            onChange={setDescription}
            // defaultValue={blog?.data?.description}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-orange-500 text-white px-4 py-2 rounded font-bold mt-5"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateBlog;
