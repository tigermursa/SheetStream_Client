"use client";
import registerUser from "@/lib/auth/register";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await registerUser({
        userName: data.userName,
        email: data.email,
        password: data.password,
      });

      if (result.errors) {
        toast.error(result?.errors[0]?.message);
        console.log(result.errors[0].message);
      } else {
        toast.success("Registration successful");
        
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 dark:bg-gray-900">
      {/* Left side - Registration form */}
      <div className="md:w-1/2 w-full flex justify-center items-center bg-white dark:bg-gray-800 p-8">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Your Best Work Starts Here
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Username Input */}
            <div>
              <input
                type="text"
                placeholder="What should we call you?"
                {...register("userName", { required: "Username is required" })}
                className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.userName ? "border-red-500" : ""
                }`}
              />
              {errors.userName && (
                <p className="text-red-500 text-sm">
                  {errors.userName.message}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <input
                type="email"
                placeholder="Your email"
                {...register("email", { required: "Email is required" })}
                className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <input
                type="password"
                placeholder="Your password"
                {...register("password", { required: "Password is required" })}
                className={`w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox text-blue-600 dark:text-blue-400"
              />
              <label className="text-gray-700 dark:text-gray-300 text-sm">
                By signing up, you agree to our Terms of Use and Privacy Policy.
              </label>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-primaryDark font-bold text-white p-3 rounded-lg hover:bg-primary"
              >
                Create an account
              </button>
            </div>
          </form>

          {/* Already have an account */}
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Already have an account?{" "}
            <a href="login" className="text-blue-600 dark:text-blue-400">
              Login here
            </a>
          </p>
        </div>
      </div>

      {/* Right side - Project Info */}
      <div className="md:w-1/2 w-full flex justify-center items-center bg-primaryDark p-8 text-white">
        <div className="space-y-4">
          <h2 className="text-4xl font-bold">SheetStream</h2>
          <p className="text-lg">
            Explore the world’s leading design portfolios. Millions of designers
            and agencies around the world showcase their portfolio work on
            Flowbite – the home to the world’s best design and creative
            professionals.
          </p>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center">
              <span className="text-xs">15.8k+</span>
            </div>
            <span>Happy Customers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
