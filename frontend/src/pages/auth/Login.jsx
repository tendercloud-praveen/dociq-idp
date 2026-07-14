import {
  FaFileAlt,
  FaRocket,
  FaLock,
  FaRobot,
  FaEnvelope,
  FaLockOpen,
  FaArrowRight,
} from "react-icons/fa";
import Cookies from "js-cookie";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { loginUser } from "../../services/documentservice";

function Login() {
  const navigate = useNavigate();
 

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    setError("");

    try {
      const response = await loginUser(data);

      if (response.success) {
        // Save tokens
        Cookies.set("access_token", response.access_token, {
          expires: 1,
          secure: false, // true in production (HTTPS)
          sameSite: "Lax",
        });

        Cookies.set("refresh_token", response.refresh_token, {
          expires: 7,
          secure: false,
          sameSite: "Lax",
        });

        // Save user details
        localStorage.setItem("user", JSON.stringify(response.user));

        navigate("/dashboard");
      } else {
        setError(response.message || "Invalid Login");
      }
    } catch (err) {
      console.error(err);
      setError("Unable to connect server");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
        {/* LEFT SIDE */}

        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 text-white p-12">
          <div>
            <div className="flex items-center gap-4 mb-12">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                <FaFileAlt className="text-3xl" />
              </div>

              <div>
                <h1 className="text-3xl font-bold">Document AI</h1>

                <p className="text-blue-100">
                  Intelligent Document Processing Platform
                </p>
              </div>
            </div>

            <span className="inline-block bg-white/20 rounded-full px-4 py-2 text-sm mb-8">
              AI Powered Platform
            </span>

            <h2 className="text-5xl font-extrabold leading-tight mb-6">
              Intelligent Document Processing
              <br />
              <span className="text-yellow-300">Made Simple.</span>
            </h2>

            <p className="text-lg text-blue-100 leading-8">
              Upload, organize and analyze your documents using Artificial
              Intelligence.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <FaRocket />
              </div>

              <div>
                <h3 className="font-bold text-xl">Lightning Fast</h3>

                <p className="text-blue-100">
                  Thousands of documents processed instantly.
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <FaLock />
              </div>

              <div>
                <h3 className="font-bold text-xl">Highly Secure</h3>

                <p className="text-blue-100">Your files remain encrypted.</p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <FaRobot />
              </div>

              <div>
                <h3 className="font-bold text-xl">AI Powered</h3>

                <p className="text-blue-100">
                  Automatic document understanding.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="flex items-center justify-center p-8 lg:p-16">
          <div className="w-full max-w-md">
            <div className="lg:hidden flex justify-center mb-8">
              <div className="w-20 h-20 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
                <FaFileAlt className="text-4xl" />
              </div>
            </div>

            <h2 className="text-4xl font-bold text-slate-800">Welcome Back</h2>

            <p className="text-slate-500 mt-2 mb-8">
              Login to continue using Document AI
            </p>

            {error && (
              <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 text-red-600 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Mobile Number */}

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Mobile Number
                </label>

                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="text"
                    placeholder="Enter Mobile Number"
                    {...register("username", {
                      required: "Mobile Number is required",
                    })}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition"
                  />
                </div>

                {errors.username && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Password */}

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>

                <div className="relative">
                  <FaLockOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="password"
                    placeholder="Enter Password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition"
                  />
                </div>

                {errors.password && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-70 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Logging in...
                  </>
                ) : (
                  <>
                    Login
                    <FaArrowRight />
                  </>
                )}
              </button>

              <div className="text-center pt-6 text-slate-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 font-semibold hover:text-blue-700"
                >
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
