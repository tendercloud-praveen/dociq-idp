import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { sendResetLink, sendOtpInstead } from "../../services/documentservice";
import {
  FaFileAlt,
  FaEnvelope,
  //   FaCpu,
  FaShieldAlt,
  FaBolt,
  FaCheckCircle,
} from "react-icons/fa";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState({ link: false, otp: false });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  // Handler for sending Link
  const onSendLink = async (data) => {
    setLoading({ ...loading, link: true });
    setStatusMessage({ type: "", text: "" });
    try {
      // Adjust according to actual backend response
      await sendResetLink(data.email);
      setStatusMessage({
        type: "success",
        text: res.message || "Reset link sent successfully to your email!",
      });
    } catch (error) {
      setStatusMessage({
        type: "error",
        text: error.message || "Failed to send reset link.",
      });
    } finally {
      setLoading({ ...loading, link: false });
    }
  };

  // Handler for sending OTP
  const handleSendOtp = async () => {
    const emailValue = getValues("email");

    if (!emailValue || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      setStatusMessage({
        type: "error",
        text: "Please enter a valid email address first to receive an OTP.",
      });
      return;
    }

    setLoading({ ...loading, otp: true });
    setStatusMessage({ type: "", text: "" });
    try {
      await sendOtpInstead(emailValue);
      setStatusMessage({
        type: "success",
        text: "OTP sent successfully! Redirecting...",
      });
      // Example: redirect to verify-otp page after a brief delay
      setTimeout(
        () => navigate("/verify-otp", { state: { email: emailValue } }),
        2000,
      );
    } catch (error) {
      setStatusMessage({
        type: "error",
        text: error.message || "Failed to send OTP.",
      });
    } finally {
      setLoading({ ...loading, otp: false });
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100">
        {/* LEFT BRANDING PANEL */}
        <div className="hidden lg:flex lg:col-span-5 p-12 flex-col justify-between bg-gradient-to-b from-blue-50/60 to-indigo-50/30 relative overflow-hidden">
          {/* Subtle curved background overlay mimicking the original crop */}
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-white transform translate-x-8 skew-x-6 hidden lg:block" />

          <div className="relative z-10 space-y-12">
            {/* Header / Logo */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white text-lg shadow-md shadow-blue-500/20">
                <FaFileAlt />
              </div>
              <div>
                <h2 className="text-slate-900 font-bold text-xl tracking-tight">
                  Document AI
                </h2>
                <p className="text-slate-500 text-xs font-medium">
                  Intelligent Document Processing System
                </p>
              </div>
            </div>

            {/* Illustration Placeholder Card */}
            <div className="relative py-6 flex justify-center">
              <div className="bg-white/80 backdrop-blur border border-slate-100 p-6 rounded-2xl shadow-lg w-56 relative flex flex-col items-center">
                <div className="h-14 w-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-2xl mb-3">
                  <FaEnvelope className="opacity-80" />
                </div>
                <div className="w-28 h-2 bg-slate-200 rounded-full mb-2"></div>
                <div className="w-20 h-1.5 bg-slate-100 rounded-full"></div>
                <div className="absolute -bottom-4 -right-4 h-12 w-12 rounded-xl bg-blue-600 shadow-lg shadow-blue-500/30 flex items-center justify-center text-white text-lg">
                  <FaCheckCircle />
                </div>
              </div>
            </div>

            {/* Feature Points */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                  {/* <FaCpu className="text-xs" /> */}
                </div>
                <span>AI-Powered Extraction</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                  <FaShieldAlt className="text-xs" />
                </div>
                <span>Secure & Reliable</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                  <FaBolt className="text-xs" />
                </div>
                <span>Fast Processing</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                  <FaCheckCircle className="text-xs" />
                </div>
                <span>Easy to Use</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 text-slate-400 text-xs">
            © 2026 Document AI. All rights reserved.
          </div>
        </div>

        {/* RIGHT INTERACTIVE CARD PANEL */}
        <div className="col-span-1 lg:col-span-7 p-8 sm:p-12 md:p-16 flex flex-col justify-center bg-white">
          <div className="w-full max-w-md mx-auto space-y-8">
            {/* Title Block */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Forgot Password?
              </h2>
              <p className="text-slate-500 text-sm mt-2 max-w-xs mx-auto">
                Enter your email and we'll send you reset instructions
              </p>
            </div>

            {/* Dynamic Status / Alert Messages */}
            {statusMessage.text && (
              <div
                className={`p-3 border rounded-xl text-xs font-medium text-center ${
                  statusMessage.type === "success"
                    ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                    : "bg-rose-50 border-rose-200 text-rose-700"
                }`}
              >
                {statusMessage.text}
              </div>
            )}

            {/* Main Form Block */}
            <form onSubmit={handleSubmit(onSendLink)} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <FaEnvelope className="text-sm" />
                  </span>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`w-full pl-11 pr-4 py-3 bg-white border rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition ${
                      errors.email
                        ? "border-rose-400 focus:border-rose-500"
                        : "border-slate-200 focus:border-blue-500"
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

              {/* PRIMARY ACTION BUTTON: Send Reset Link */}
              <button
                type="submit"
                disabled={loading.link || loading.otp}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-60 text-white font-semibold text-sm rounded-xl transition shadow-md shadow-blue-500/10 cursor-pointer"
              >
                {loading.link ? "Sending..." : "Send Reset Link"}
              </button>
            </form>

            {/* OR Divider Line */}
            <div className="relative flex items-center justify-center my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <span className="relative px-3 bg-white text-xs text-slate-400 uppercase tracking-widest font-medium">
                or
              </span>
            </div>

            {/* SECONDARY ACTION BUTTON: Send OTP Instead */}
            <button
              type="button"
              disabled={loading.link || loading.otp}
              onClick={handleSendOtp}
              className="w-full py-3 px-4 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 font-semibold text-sm rounded-xl border border-slate-200 transition shadow-sm cursor-pointer"
            >
              {loading.otp ? "Generating OTP..." : "Send OTP Instead"}
            </button>

            {/* Navigation Link Footer */}
            <div className="text-center text-xs text-slate-500 pt-2">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-semibold hover:underline transition ml-1"
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

export default ForgotPassword;
