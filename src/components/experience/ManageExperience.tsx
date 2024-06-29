/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllExperienceQuery } from "../../redux/api/experienceApi";
import NoDataFound from "../NoDataFound";
import ExperienceCard from "./ExperienceCard";

const ManageExperience = () => {
  const { data } = useGetAllExperienceQuery({});
  return (
    <div>
      <p className="lg:mb-6 mt-3 lg:text-3xl font-bold text-center text-orange-500">
        All Experience
      </p>
      <div>
        {data?.data?.length === 0 ? (
          <NoDataFound title="Experience" />
        ) : (
          <div className="overflow-x-auto overflow-y-auto mt-4 lg:mt-10 mb-5 ">
            <table className="table border-4 shadow-xl">
              <thead>
                <tr className="text-xl font-bold text-orange-500">
                  <th>Title</th>
                  <th>Company</th>
                  <th>Time Span</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="">
                {data?.data?.map((item: any) => (
                  <ExperienceCard key={item._id} item={item} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageExperience;
