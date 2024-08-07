import axios from "axios";
import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { Box } from "../components/Box";
import { Button } from "../components/Button";
import toast from "react-hot-toast";

type ProfileTypes = {
  username: string;
  email: string;
  googleId: string;
  facebookId: string;
};

function Profile() {
  const [formData, setFormData] = useState<ProfileTypes>({
    email: "",
    username: "",
    googleId: "",
    facebookId: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API}/profile`,
        { withCredentials: true }
      );
      setFormData({ email: response.data.email, facebookId: response.data.facebookId, googleId: response.data.googleId, username: response.data.username });
    } catch (error) {
      toast.error("Error fetching profile");
    }
  };

  const handleNameChange = async () => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BASE_API}/profile`,
        { username: formData.username },
        { withCredentials: true }
      );
      toast.success("Name updated successfully");
    } catch (error) {
      toast.error("Error updating name");
    }
  };

  return (
    <div>
      <Box>
      <div className="mb-4">
          <p className="text-white">
            <strong>Email:</strong> {formData.email}
          </p>
          <p className="text-white">
            <strong>Google Id:</strong> {formData.googleId}
          </p>
          <p className="text-white">
            <strong>Facebook Id:</strong> {formData.facebookId}
          </p>
        </div>
        <Input
          label="username"
          type="text"
          value={formData.username}
          onChange={(e) => setFormData({...formData, username: e.target.value})}
          placeholder="Name"
        />
        <Button onClick={handleNameChange}>Update Username</Button>
      </Box>
    </div>
  );
}

export default Profile;
