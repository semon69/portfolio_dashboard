/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useUpdateProjectMutation } from "../../redux/api/projectApi";

const UpdateProject = () => {
  const project: any = useLoaderData();
  const [updateProject] = useUpdateProjectMutation();
  const { handleSubmit, control, setValue } = useForm();
  const navigate = useNavigate();

  const updateData = async (data: any) => {
    try {
      const payload = {
        id: project?.data?._id,
        data,
      };

      const res = await updateProject(payload);

      if ("data" in res && res.data.success) {
        toast.success(res.data.message);
        // Manually reset the form by setting the values to an empty object
        Object.keys(data).forEach((field) => {
          setValue(field, "");
        });
        navigate("/manage-projects");
      }
    } catch (error) {
      toast.error("Faild to update project");
    }
  };
  return (
    <div>
      <div className="container mx-auto">
        <p className="font-bold text-center text-orange-500 text-3xl">
          Update Project
        </p>
        <div className="border-4 p-2 shadow-xl m-2 lg:m-10 md:m-5">
          <form onSubmit={handleSubmit(updateData)}>
            <div className="lg:flex gap-4">
              <div className="w-full lg:w-1/2 md:w-full sm:w-full">
                <label className="label text-lg md:text-base sm:text-sm font-bold">
                  <span className="label-text text-orange-500">Title</span>
                </label>
                <Controller
                  name="title"
                  defaultValue={project?.data?.title}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Project Title"
                      className="input input-bordered w-full"
                      required
                    />
                  )}
                />
              </div>
              <div className="w-full lg:w-1/2 md:w-full sm:w-full">
                <label className="label text-lg md:text-base sm:text-sm">
                  <span className="label-text font-bold text-orange-500">
                    Image
                  </span>
                </label>
                <Controller
                  name="image"
                  defaultValue={project?.data?.image}
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
            <div className=" lg:flex gap-4">
              <div className="w-full lg:w-1/2 md:w-full sm:w-full">
                <label className="label text-lg md:text-base sm:text-sm">
                  <span className="label-text font-bold text-orange-500">
                    Github Frontend
                  </span>
                </label>
                <Controller
                  name="g_frontend"
                  defaultValue={project?.data?.g_frontend}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Provide Frontend Github Link"
                      className="input input-bordered w-full"
                      required
                    />
                  )}
                />
              </div>
              <div className="w-full lg:w-1/2 md:w-full sm:w-full">
                <label className="label text-lg md:text-base sm:text-sm">
                  <span className="label-text font-bold text-orange-500">
                    Github Backend
                  </span>
                </label>
                <Controller
                  name="g_backend"
                  defaultValue={project?.data?.g_backend}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Provide Backend Github Link"
                      className="input input-bordered w-full"
                    />
                  )}
                />
              </div>
            </div>
            <div className=" lg:flex gap-4">
              <div className="w-full">
                <label className="label text-lg md:text-base sm:text-sm">
                  <span className="label-text font-bold text-orange-500">
                    Live Link
                  </span>
                </label>
                <Controller
                  name="live_link"
                  defaultValue={project?.data?.live_link}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Provide Live Link"
                      className="input input-bordered w-full"
                      required
                    />
                  )}
                />
              </div>
              <div className="w-full">
                <label className="label text-lg md:text-base sm:text-sm">
                  <span className="label-text font-bold text-orange-500">
                    Technology Used
                  </span>
                </label>
                <Controller
                  name="tech"
                  defaultValue={project?.data?.tech}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Technology used in this project"
                      className="input input-bordered w-full"
                      required
                    />
                  )}
                />
              </div>
            </div>
            <div className="">
              <div className="w-full">
                <label className="label text-lg md:text-base sm:text-sm">
                  <span className="label-text font-bold text-orange-500">
                    Description
                  </span>
                </label>
                <Controller
                  name="description"
                  defaultValue={project?.data?.description}
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

export default UpdateProject;
