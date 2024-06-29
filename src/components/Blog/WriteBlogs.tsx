import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Blog.css";
import { useAddBlogMutation } from "../../redux/api/blogApi";
import { toast } from "sonner";

const WriteBlogs = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [addBlog] = useAddBlogMutation();

  const handleSubmit = async () => {
    const blogData = { title, image, description };

    try {
      const res = await addBlog(blogData);

      if ("data" in res && res.data.success) {
        toast.success(res.data.message);
        setTitle("");
        setImage("");
        setDescription("");
      }
    } catch (error) {
      toast.error("Failed to post blog");
    }
  };

  return (
    <div className="container mx-auto">
      <p className="font-bold text-center text-orange-500 text-3xl">
        Write Blogs
      </p>
      <div className="border-4 p-4 shadow-xl m-2 lg:m-10 md:m-5">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="input input-bordered w-full my-3"
        />
        <div className="custom-quill">
          <ReactQuill value={description} onChange={setDescription} />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-orange-500 text-white px-4 py-2 rounded font-bold mt-5"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default WriteBlogs;
