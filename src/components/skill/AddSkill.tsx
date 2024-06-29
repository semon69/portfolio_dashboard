/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const AddSkill = () => {
    const { handleSubmit, control } = useForm();
  
    const onSubmit = async (data: any) => {
      
  
      try {
        console.log(data);
  
      } catch (error) {
        toast.error("Faild to create flower");
      }
    };
  return (
    <div>
      <div className="container mx-auto">
        <p className="font-bold text-center text-orange-500 text-3xl">
          Add new Skill
        </p>
        <div className="border-4 p-2 shadow-xl m-2 lg:m-10 md:m-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="">
              <div className="w-full ">
                <label className="label text-lg md:text-base sm:text-sm font-bold">
                  <span className="label-text text-orange-500">Name</span>
                </label>
                <Controller
                  name="name"
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
                  <span className="label-text font-bold text-orange-500">Image</span>
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
            <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded font-bold mt-5">
                  Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSkill;