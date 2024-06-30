/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useDeleteBlogMutation } from "../../redux/api/blogApi";

const BlogCard = ({ item }: { item: any }) => {
  const [deleteBlog] = useDeleteBlogMutation();

  const handleDelete = async (_id: string) => {
    await deleteBlog(_id);
    toast.success("Deleted success");
  };

  return (
    <tr className="overflow-x-auto overflow-y-auto">
      <th>{item?.title}</th>
      <th className="">
        <button className="bg-blue-600 text-white btn-xs mr-3 rounded-md">
          <Link to={`/update-blog/${item?._id}`}>
            Update
          </Link>
        </button>
        <button
          onClick={() => handleDelete(item._id)}
          className=" bg-red-600 text-white btn-xs rounded-md"
        >
          Delete
        </button>
      </th>
    </tr>
  );
};

export default BlogCard;
