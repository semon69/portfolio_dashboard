/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useDeleteProjectMutation } from "../../redux/api/projectApi";

const ProjectCard = ({ item }: { item: any }) => {
  const [deleteProject] = useDeleteProjectMutation();

  const handleDelete = async (_id: string) => {
    await deleteProject(_id);
    toast.success("Deleted success");
  };

  return (
    <tr className="overflow-x-auto overflow-y-auto">
      <th>{item?.title}</th>
      <th className="">
        <button className="bg-blue-600 text-white btn-xs mr-3 rounded-md">
          <Link to={`/update-project/${item?._id}`}>Update</Link>
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

export default ProjectCard;
