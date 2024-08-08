import React, { useState } from "react";
import { Box } from "../components/Box";
import { Button } from "../components/Button";
import { ErrorText } from "../components/ErrorText";
import Input from "../components/Input";
import { forgotPassword } from "../service/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setSuccess("Password reset email sent. Please check your inbox.");
      setError(null);
    } catch (error) {
      setError("Error sending password reset email");
      setSuccess(null);
    }
  };

  return (
    <div className="mx-auto p-4 bg-base-50 min-h-screen">
      <Box className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-primary mb-4">Forgot Password</h1>
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <ErrorText message={error} />}
          {success && <p className="text-green-500">{success}</p>}
          <Button variant="primary" className="w-full mt-4">
            Send Reset Link
          </Button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Remembered your password?{" "}
            <a href="/login" className="text-primary font-medium">
              Login
            </a>
          </p>
        </div>
      </Box>
    </div>
  );
}
