/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAddProjectMutation } from "../../redux/api/projectApi";

const AddProject = () => {
  const { handleSubmit, control, setValue } = useForm();
  const [addProject] = useAddProjectMutation();

  const onSubmit = async (data: any) => {
    try {
      // console.log(data);
      const res = await addProject(data);
      if ("data" in res && res.data.success) {
        toast.success(res.data.message);
        // Manually reset the form by setting the values to an empty object
        Object.keys(data).forEach((field) => {
          setValue(field, "");
        });
      }
    } catch (error) {
      toast.error("Faild to create flower");
    }
  };

  return (
    <div>
      <div className="container mx-auto">
        <p className="font-bold text-center text-orange-500 text-3xl">
          Add new Project
        </p>
        <div className="border-4 p-2 shadow-xl m-2 lg:m-10 md:m-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="lg:flex gap-4">
              <div className="w-full lg:w-1/2 md:w-full sm:w-full">
                <label className="label text-lg md:text-base sm:text-sm font-bold">
                  <span className="label-text text-orange-500">Title</span>
                </label>
                <Controller
                  name="title"
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
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProject;
