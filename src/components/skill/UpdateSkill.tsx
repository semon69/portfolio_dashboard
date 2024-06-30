/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUpdateSkillMutation } from "../../redux/api/skillApi";
import { useLoaderData, useNavigate } from "react-router-dom";

const UpdateSkill = () => {
  const skill: any = useLoaderData();
  const [updateSkill] = useUpdateSkillMutation();
  const { handleSubmit, control, setValue } = useForm();
  const navigate = useNavigate()

  const updateData = async (data: any) => {
    try {
      const payload = {
        id: skill?.data?._id,
        data,
      };
      const res = await updateSkill(payload);
      if ("data" in res && res.data.success) {
        toast.success(res.data.message);
        // Manually reset the form by setting the values to an empty object
        Object.keys(data).forEach((field) => {
          setValue(field, "");
        });
        navigate('/manage-skills')
      }
    } catch (error) {
      toast.error("Faild to create flower");
    }
  };
  return (
    <div>
      <div className="container mx-auto">
        <p className="font-bold text-center text-orange-500 text-3xl">
          Update Skill
        </p>
        <div className="border-4 p-2 shadow-xl m-2 lg:m-10 md:m-5">
          <form onSubmit={handleSubmit(updateData)}>
            <div className="">
              <div className="w-full ">
                <label className="label text-lg md:text-base sm:text-sm font-bold">
                  <span className="label-text text-orange-500">Name</span>
                </label>
                <Controller
                  name="name"
                  defaultValue={skill?.data?.name}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Skill Name"
                      className="input input-bordered w-full"
                      required
                    />
                  )}
                />
              </div>
              <div className="w-fulll">
                <label className="label text-lg md:text-base sm:text-sm">
                  <span className="label-text font-bold text-orange-500">
                    Image
                  </span>
                </label>
                <Controller
                  name="image"
                  defaultValue={skill?.data?.image}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Provide a valid Image link"
                      className="input input-bordered w-full"
                      required
                    />
                  )}
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded font-bold mt-5"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateSkill;
