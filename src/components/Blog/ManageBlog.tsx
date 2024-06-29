/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllBlogsQuery } from "../../redux/api/blogApi";
import NoDataFound from "../NoDataFound";
import BlogCard from "./BlogCard";

const ManageBlog = () => {
  const { data } = useGetAllBlogsQuery({});
  return (
    <div>
      <p className="lg:mb-6 mt-3 lg:text-3xl font-bold text-center text-orange-500">
        All Blogs
      </p>
      <div>
        {data?.data?.length === 0 ? (
          <NoDataFound title="Blogs" />
        ) : (
          <div className="overflow-x-auto overflow-y-auto mt-4 lg:mt-10 mb-5 ">
            <table className="table border-4 shadow-xl">
              <thead>
                <tr className="text-xl font-bold text-orange-500">
                  <th>Title</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="">
                {data?.data?.map((item: any) => (
                  <BlogCard key={item._id} item={item} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBlog;