import React, { useState } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { Box } from "../components/Box";
import Input from "../components/Input";
import { Button } from "../components/Button";
import { ErrorText } from "../components/ErrorText";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login } from "../service/auth";
import { type Login } from "../types";

export default function Login() {
  const [formData, setFormData] = useState<Login>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(formData)
      if (response.data.isVerified) {
        toast.success("Logged in successfully");
        navigate("/dashboard")
      } else {
        setError("Please verify your email")
      }
    } catch (error:any) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="mx-auto p-4 bg-base-50 min-h-screen">
      <Box className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-primary mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {error && <ErrorText message={error} />}
          <Button variant="primary" className="w-full mt-4">
            Submit
          </Button>
        </form>
        <div className="relative flex py-8 items-center">
          <div className="flex-grow border-t border-[1px] border-gray-200"></div>
          <span className="flex-shrink mx-4 font-medium text-gray-500">OR</span>
          <div className="flex-grow border-t border-[1px] border-gray-200"></div>
        </div>
        <form>
          <div className="flex flex-row gap-2 justify-center mb-4">
            <a
              href={`${import.meta.env.VITE_BASE_API}/auth/google`}
              className="flex flex-row items-center gap-2 bg-base-150 p-2 rounded-md text-gray-200 cursor-pointer"
            >
              <FaGoogle size={24} />
              <span className="font-medium">Google</span>
            </a>
            <a
              href={`${import.meta.env.VITE_BASE_API}/auth/facebook`}
              className="flex flex-row items-center gap-2 bg-base-150 p-2 rounded-md text-gray-200 cursor-pointer"
            >
              <FaFacebook size={24} />
              <span className="font-medium">Facebook</span>
            </a>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <a href="/register" className="text-primary font-medium">
              Register
            </a>
          </p>
          <p className="text-sm text-gray-500">
            Forgot Password?{" "}
            <a href="/forgot-password" className="text-primary font-medium">
              Forgot Password
            </a>
          </p>
        </div>
      </Box>
    </div>
  );
}
