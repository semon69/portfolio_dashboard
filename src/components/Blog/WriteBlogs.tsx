import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddBlogMutation } from "../../redux/api/blogApi";
import { runMutation } from "../../utils/runMutation";
import BlogEditor from "./BlogEditor";
import { BlogFormValues, emptyBlog } from "./blogFormValues";

const WriteBlogs = () => {
  const [values, setValues] = useState<BlogFormValues>(emptyBlog);
  const [addBlog, { isLoading }] = useAddBlogMutation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const ok = await runMutation(
      addBlog({
        ...values,
        title: values.title.trim(),
        image: values.image.trim(),
        excerpt: values.excerpt.trim(),
      }),
      {
        success: values.published ? "Post published" : "Draft saved",
      }
    );

    if (ok) {
      setValues(emptyBlog);
      navigate("/manage-blogs");
    }
  };

  return (
    <BlogEditor
      mode="create"
      value={values}
      onChange={setValues}
      onSubmit={handleSubmit}
      saving={isLoading}
    />
  );
};

export default WriteBlogs;
