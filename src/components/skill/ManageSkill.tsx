/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllSkillsQuery } from "../../redux/api/skillApi";
import NoDataFound from "../NoDataFound";
import SkillCard from "./SkillCard";

const ManageSkill = () => {
  const { data } = useGetAllSkillsQuery({});
  return (
    <div>
      <p className="lg:mb-6 mt-3 lg:text-3xl font-bold text-center text-orange-500">
        All Skills
      </p>
      <div className="">
        {data?.data?.length === 0 ? (
          <NoDataFound title="Skills" />
        ) : (
          <div className="overflow-x-auto overflow-y-auto mt-4 lg:mt-10 mb-5 ">
            <table className="table border-4 shadow-xl">
              <thead>
                <tr className="text-xl font-bold text-orange-500">
                  <th>Image</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="">
                {data?.data?.map((item: any) => (
                  <SkillCard key={item._id} item={item} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageSkill;
