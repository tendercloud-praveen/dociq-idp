import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { resetPassword } from "../../services/documentService";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const { register, handleSubmit } = useForm();

  const handleResetPassword = async (data) => {
    try {
      await resetPassword({
        token,
        new_password: data.newPassword,
        confirm_password: data.confirmPassword,
      });

      alert("Password reset successfully");

      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to reset password");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleResetPassword)}>
      <input
        type="password"
        placeholder="New Password"
        {...register("newPassword")}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        {...register("confirmPassword")}
      />

      <button type="submit">Reset Password</button>
    </form>
  );
}
