/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useUpdateExperienceMutation } from "../../redux/api/experienceApi";

const UpdateExperience = () => {
  const experience: any = useLoaderData();
  const [updateExperience] = useUpdateExperienceMutation();
  const { handleSubmit, control, setValue } = useForm();
  const navigate = useNavigate();

  const updateData = async (data: any) => {
    try {
      const payload = {
        id: experience?.data?._id,
        data,
      };

      const res = await updateExperience(payload);

      if ("data" in res && res.data.success) {
        toast.success(res.data.message);
        // Manually reset the form by setting the values to an empty object
        Object.keys(data).forEach((field) => {
          setValue(field, "");
        });
        navigate("/manage-experience");
      }
    } catch (error) {
      toast.error("Faild to update experience");
    }
  };
  return (
    <div>
      <div className="container mx-auto">
        <p className="font-bold text-center text-orange-500 text-3xl">
          Add new Experience
        </p>
        <div className="border-4 p-2 shadow-xl m-2 lg:m-10 md:m-5">
          <form onSubmit={handleSubmit(updateData)}>
            <div className="">
              <div className="w-full ">
                <label className="label text-lg md:text-base sm:text-sm font-bold">
                  <span className="label-text text-orange-500">Title</span>
                </label>
                <Controller
                  name="title"
                  defaultValue={experience?.data?.title}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Job Title / Your Designation"
                      className="input input-bordered w-full"
                      required
                    />
                  )}
                />
              </div>
              <div className="w-fulll">
                <label className="label text-lg md:text-base sm:text-sm">
                  <span className="label-text font-bold text-orange-500">
                    Company Name
                  </span>
                </label>
                <Controller
                  name="company"
                  defaultValue={experience?.data?.company}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Provide your company Name"
                      className="input input-bordered w-full"
                      required
                    />
                  )}
                />
              </div>
              <div className="w-fulll">
                <label className="label text-lg md:text-base sm:text-sm">
                  <span className="label-text font-bold text-orange-500">
                    Time Span
                  </span>
                </label>
                <Controller
                  name="timeSpan"
                  defaultValue={experience?.data?.timeSpan}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Ex: January 2023 -- December 2024"
                      className="input input-bordered w-full"
                      required
                    />
                  )}
                />
              </div>
              <div className="w-fulll">
                <label className="label text-lg md:text-base sm:text-sm">
                  <span className="label-text font-bold text-orange-500">
                    Description
                  </span>
                </label>
                <Controller
                  name="description"
                  defaultValue={experience?.data?.description}
                  control={control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      placeholder="Description"
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

export default UpdateExperience;
