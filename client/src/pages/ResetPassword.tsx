import React, { useState } from "react";
import { Box } from "../components/Box";
import { Button } from "../components/Button";
import { ErrorText } from "../components/ErrorText";
import Input from "../components/Input";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ResetPassword() {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setSuccess(null);
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_BASE_API}/auth/reset-password`, {
        userId: id,
        password: formData.password,
      });
      setSuccess("Password reset successfully");
      setError(null);
    } catch (error) {
      setError("Error resetting password");
      setSuccess(null);
    }
  };

  return (
    <div className="mx-auto p-4 bg-base-50 min-h-screen">
      <Box className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-primary mb-4">Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <Input
            label="New Password"
            type="password"
            placeholder="Enter your new password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your new password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
          {error && <ErrorText message={error} />}
          {success && <p className="text-green-500">{success}</p>}
          <Button variant="primary" className="w-full mt-4">
            Reset Password
          </Button>
        </form>
      </Box>
    </div>
  );
}
