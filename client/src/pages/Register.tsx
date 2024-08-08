import React, { useState } from "react";
import { Box } from "../components/Box";
import { Button } from "../components/Button";
import { ErrorText } from "../components/ErrorText";
import Input from "../components/Input";
import axios from "axios";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import toast from "react-hot-toast";
import { type Register } from "../types";

const validatePassword = (password: string) => {
  const errors = [];
  if (!/[a-z]/.test(password)) errors.push("Password must contain at least one lowercase letter.");
  if (!/[A-Z]/.test(password)) errors.push("Password must contain at least one uppercase letter.");
  if (!/\d/.test(password)) errors.push("Password must contain at least one digit.");
  if (!/[!@#$%^&*()_+{}[\]:;"'<>,.?/~`|-]/.test(password)) errors.push("Password must contain at least one special character.");
  if (password.length < 8) errors.push("Password must be at least 8 characters long.");
  return errors;
};

export default function Register() {
  const [formData, setFormData] = useState<Register>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setErrors(validatePassword(formData.password));

    if (errors.length > 0) {
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_BASE_API}/auth/register`, { ...formData });
      toast.success("Signed up successfully");
    } catch (error:any) {
      toast.error(error.response.data.message||"Error signing up");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setFormData({ ...formData, password });
    setErrors(validatePassword(password));
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, confirmPassword: e.target.value });
    if (e.target.value !== formData.password) {
      setErrors([...errors, "Passwords do not match"]);
    } else {
      setErrors(errors.filter(error => error !== "Passwords do not match"));
    }
  };

  return (
    <div className="mx-auto p-4 bg-base-50 min-h-screen">
      <Box className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-primary mb-4">Register</h1>
        <form onSubmit={handleSubmit}>
          <Input
            label="Username"
            placeholder="Choose a username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <Input
            label="Password"
            type="password"
            placeholder="Choose a password"
            value={formData.password}
            onChange={handlePasswordChange}
          />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {errors.length > 0 && (
            <div className="text-red-500 mt-2">
              {errors.map((error, index) => (
                <ErrorText key={index} message={error} />
              ))}
            </div>
          )}
          <Button variant="primary" className="w-full mt-4" type="submit" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
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
            Already have an account?{" "}
            <a href="/login" className="text-primary font-medium">
              Login
            </a>
          </p>
        </div>
      </Box>
    </div>
  );
}
