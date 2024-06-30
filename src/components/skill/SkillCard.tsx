/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useDeleteSkillMutation } from "../../redux/api/skillApi";

const SkillCard = ({ item }: { item: any }) => {
  const [deleteSkill] = useDeleteSkillMutation();

  const handleDelete = async (_id: string) => {
    await deleteSkill(_id);
    toast.success("Deleted success");
  };

  return (
    <tr className="overflow-x-auto overflow-y-auto">
      <td>
        <div className="space-y-2">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={item?.image} alt="Image" />
            </div>
          </div>
        </div>
      </td>
      <th>{item?.name}</th>
      <th className="">
        <button className="bg-blue-600 text-white btn-xs mr-3 rounded-md">
          <Link to={`/update-skill/${item?._id}`} state={item}>
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

export default SkillCard;
