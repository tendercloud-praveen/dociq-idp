import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../../services/documentservice";
import {
  FaFileAlt,
  FaRocket,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaRobot,
  FaUser,
  FaEnvelope,
  FaBuilding,
  FaBriefcase,
  FaLockOpen,
  FaArrowRight,
} from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      mobileNumber: "",
      company: "",
      role: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setApiError("");
    try {
      await registerUser(data);
      alert("Account created successfully");
      navigate("/login");
    } catch (error) {
      setApiError(error.detail || error.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="relative w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xl">
        {/* LEFT SECTION (Branding Panel with Skewed Background) */}
        <div className="hidden lg:flex lg:col-span-5 p-12 flex-col justify-between bg-gradient-to-b from-blue-50/60 to-indigo-50/30 relative overflow-hidden">
          {/* Decorative angle separator cut mimicking the picture template */}
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-white transform translate-x-8 skew-x-6 hidden lg:block z-0" />

          <div className="relative z-10 space-y-12">
            {/* Logo Group */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white text-lg shadow-md shadow-blue-500/20">
                <FaFileAlt />
              </div>
              <div>
                <h2 className="text-slate-900 font-bold text-xl tracking-tight leading-none">
                  Document AI
                </h2>
                <p className="text-slate-400 text-xs mt-1.5 font-medium">
                  Intelligent Document Processing System
                </p>
              </div>
            </div>

            {/* Simulated Hero Feature Illustration Minimalist Graphic */}
            <div className="relative py-4 flex justify-left pl-2">
              <div className="bg-white/90 backdrop-blur border border-slate-100 p-5 rounded-2xl shadow-md w-52 relative flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-xl mb-3">
                  <FaUser className="opacity-80" />
                </div>
                <div className="w-24 h-2 bg-slate-200 rounded-full mb-2"></div>
                <div className="w-16 h-1.5 bg-slate-100 rounded-full"></div>
                <div className="absolute -bottom-3 -right-3 h-10 w-10 rounded-xl bg-blue-600 shadow-md shadow-blue-500/30 flex items-center justify-center text-white text-sm">
                  <FaLock className="text-xs" />
                </div>
              </div>
            </div>

            {/* Features Bullet List */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                <div className="p-2 rounded-lg bg-blue-100/70 text-blue-600">
                  <FaRobot className="text-xs" />
                </div>
                <span>AI-Powered Extraction</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                <div className="p-2 rounded-lg bg-blue-100/70 text-blue-600">
                  <FaLock className="text-xs" />
                </div>
                <span>Secure & Reliable</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                <div className="p-2 rounded-lg bg-blue-100/70 text-blue-600">
                  <FaRocket className="text-xs" />
                </div>
                <span>Fast Processing</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                <div className="p-2 rounded-lg bg-blue-100/70 text-blue-600">
                  <FaArrowRight className="text-xs" />
                </div>
                <span>Easy to Use</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 text-slate-400 text-xs font-normal">
            © 2026 Document AI. All rights reserved.
          </div>
        </div>

        {/* RIGHT SECTION (Registration Inputs Card) */}
        <div className="col-span-1 lg:col-span-7 p-8 sm:p-12 md:p-14 flex flex-col justify-center bg-white">
          <div className="w-full max-w-md mx-auto space-y-7">
            {/* Form Title */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Create Account
              </h2>
              <p className="text-slate-500 text-sm mt-1.5">
                Create your workspace and start using Document AI.
              </p>
            </div>

            {/* Error Message Box */}
            {apiError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-xs font-medium text-center">
                {apiError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4.5">
              {/* FULL NAME */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                  Full Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className={`w-full pl-11 pr-4 py-2.5 bg-white border rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all ${
                      errors.fullName
                        ? "border-rose-400 focus:border-rose-500"
                        : "border-slate-200 focus:border-blue-600"
                    }`}
                    {...register("fullName", {
                      required: "Full name is required",
                    })}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-xs text-rose-500 font-medium pl-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* EMAIL */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`w-full pl-11 pr-4 py-2.5 bg-white border rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all ${
                      errors.email
                        ? "border-rose-400 focus:border-rose-500"
                        : "border-slate-200 focus:border-blue-600"
                    }`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-rose-500 font-medium pl-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase">
                  Mobile Number
                </label>

                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type="text"
                    placeholder="Enter Mobile Number"
                    className="w-full pl-11 pr-4 py-2.5 border border-slate-300 rounded-xl"
                    {...register("mobileNumber", {
                      required: "Mobile Number is required",
                    })}
                  />
                </div>

                {errors.mobileNumber && (
                  <p className="text-xs text-red-500">
                    {errors.mobileNumber.message}
                  </p>
                )}
              </div>

              {/* COMPANY & ROLE SIDE-BY-SIDE ON TABLET/DESKTOP */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    Company
                  </label>
                  <div className="relative">
                    <FaBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                    <input
                      type="text"
                      placeholder="Company Name"
                      className={`w-full pl-11 pr-4 py-2.5 bg-white border rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all ${
                        errors.company
                          ? "border-rose-400 focus:border-rose-500"
                          : "border-slate-200 focus:border-blue-600"
                      }`}
                      {...register("company", {
                        required: "Company name is required",
                      })}
                    />
                  </div>
                  {errors.company && (
                    <p className="text-xs text-rose-500 font-medium pl-1">
                      {errors.company.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    Role
                  </label>
                  <div className="relative">
                    <FaBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                    <select
                      className={`w-full pl-11 pr-8 py-2.5 bg-white border rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer ${
                        errors.role
                          ? "border-rose-400 focus:border-rose-500"
                          : "border-slate-200 focus:border-blue-600"
                      }`}
                      {...register("role", {
                        required: "Please select a role",
                      })}
                    >
                      <option value="">Select Role</option>
                      <option value="Developer">Developer</option>
                      <option value="HR">HR</option>
                      <option value="Manager">Manager</option>
                      <option value="Admin">Admin</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                      ▼
                    </div>
                  </div>
                  {errors.role && (
                    <p className="text-xs text-rose-500 font-medium pl-1">
                      {errors.role.message}
                    </p>
                  )}
                </div>
              </div>

              {/* PASSWORD */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase">
                  Password
                </label>

                <div className="relative">
                  <FaLockOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    className={`w-full pl-11 pr-12 py-2.5 border rounded-xl focus:outline-none focus:ring-4 transition ${
                      errors.password
                        ? "border-red-500 focus:ring-red-100"
                        : "border-slate-300 focus:border-blue-600 focus:ring-blue-100"
                    }`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Minimum 6 characters",
                      },
                    })}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase">
                  Confirm Password
                </label>

                <div className="relative">
                  <FaLockOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className={`w-full pl-11 pr-12 py-2.5 border rounded-xl focus:outline-none focus:ring-4 transition ${
                      errors.confirmPassword
                        ? "border-red-500 focus:ring-red-100"
                        : "border-slate-300 focus:border-blue-600 focus:ring-blue-100"
                    }`}
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* TERMS & CONDITIONS */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    id="terms"
                    className="h-4 w-4 rounded border-slate-300 bg-white text-blue-600 focus:ring-blue-500/20 focus:ring-offset-white cursor-pointer"
                    {...register("terms", {
                      required: "You must accept the terms and conditions",
                    })}
                  />
                  <label
                    htmlFor="terms"
                    className="text-xs text-slate-500 select-none cursor-pointer font-medium"
                  >
                    I agree to the{" "}
                    <span className="text-blue-600 font-semibold hover:underline">
                      Terms & Conditions
                    </span>
                  </label>
                </div>
                {errors.terms && (
                  <p className="text-xs text-rose-500 font-medium pl-1">
                    {errors.terms.message}
                  </p>
                )}
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-60 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/10 transition-all cursor-pointer"
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
                {!isSubmitting && <FaArrowRight className="text-xs" />}
              </button>
            </form>

            {/* Login Navigation Footer */}
            <div className="text-center text-xs text-slate-500 pt-1 font-medium">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-semibold hover:underline ml-0.5"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
