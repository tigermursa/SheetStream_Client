"use client"
import { useForm } from "react-hook-form";

const RegisterPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Submit data to API or handle accordingly
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 dark:bg-gray-900">
      {/* Left side - Registration form */}
      <div className="md:w-1/2 w-full flex justify-center items-center bg-white dark:bg-gray-800 p-8">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Your Best Work Starts Here</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="What should we call you?"
                {...register("userName", { required: "Username is required" })}
                className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.userName ? "border-red-500" : ""
                }`}
              />
              {errors.userName && <p className="text-red-500 text-sm">{errors.userName.message}</p>}
            </div>

            <div>
              <input
                type="email"
                placeholder="Your email"
                {...register("email", { required: "Email is required" })}
                className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <input
                type="password"
                placeholder="Your password"
                {...register("password", { required: "Password is required" })}
                className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox text-blue-600 dark:text-blue-400" />
              <label className="text-gray-700 dark:text-gray-300 text-sm">
                By signing up, you agree to our Terms of Use and Privacy Policy.
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox text-blue-600 dark:text-blue-400" />
              <label className="text-gray-700 dark:text-gray-300 text-sm">
                Email me about product updates and resources.
              </label>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Create an account
              </button>
            </div>
          </form>

          <p className="text-sm text-gray-700 dark:text-gray-300">
            Already have an account? <a href="login" className="text-blue-600 dark:text-blue-400">Login here</a>
          </p>
        </div>
      </div>

      {/* Right side - Project Info */}
      <div className="md:w-1/2 w-full flex justify-center items-center bg-blue-600 p-8 text-white">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold">SheetStream</h2>
          <p className="text-lg">
            Explore the world’s leading design portfolios. Millions of designers and agencies around the world showcase their portfolio work on Flowbite – the home to the world’s best design and creative professionals.
          </p>
          <div className="flex items-center space-x-3">
            {/* Example of an avatar group */}
            <div className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center">
              {/* User Image Placeholder */}
              <span>15.7k+</span>
            </div>
            <span>Happy Customers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
