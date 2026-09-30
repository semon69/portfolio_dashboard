/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useUpdateBlogMutation } from "../../redux/api/blogApi";
import { runMutation } from "../../utils/runMutation";
import BlogEditor from "./BlogEditor";
import { BlogFormValues, emptyBlog } from "./blogFormValues";

const UpdateBlog = () => {
  const loaded: any = useLoaderData();
  const navigate = useNavigate();
  const [updateBlog, { isLoading }] = useUpdateBlogMutation();
  const [values, setValues] = useState<BlogFormValues>(emptyBlog);

  useEffect(() => {
    const post = loaded?.data;
    if (!post) return;

    setValues({
      title: post.title ?? "",
      image: post.image ?? "",
      excerpt: post.excerpt ?? "",
      description: post.description ?? "",
      tags: Array.isArray(post.tags) ? post.tags : [],
      // Posts written before `published` existed have no value; treat
      // them as live rather than silently hiding them.
      published: post.published !== false,
    });
  }, [loaded]);

  const handleSubmit = async () => {
    const ok = await runMutation(
      updateBlog({
        id: loaded?.data?._id,
        data: {
          ...values,
          title: values.title.trim(),
          image: values.image.trim(),
          excerpt: values.excerpt.trim(),
        },
      }),
      { success: "Post updated" }
    );

    if (ok) navigate("/manage-blogs");
  };

  return (
    <BlogEditor
      mode="edit"
      value={values}
      onChange={setValues}
      onSubmit={handleSubmit}
      saving={isLoading}
    />
  );
};

export default UpdateBlog;
