import axios from "axios";
import { useEffect, useState } from "react";
import Input from "../components/Input";
import { Box } from "../components/Box";
import { Button } from "../components/Button";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Loading from "../components/Loading";
import { getProfile } from "../service/profile";
import Error500 from "../components/Error500";

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
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      setFormData({
        email: response.data.email,
        facebookId: response.data.facebookId,
        googleId: response.data.googleId,
        username: response.data.username,
      });
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
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

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error500 />;
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
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
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            placeholder="Name"
          />
          <Button
            className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-600 transition-colors"
            onClick={handleNameChange}
          >
            Update Username
          </Button>
        </Box>
      </motion.div>
    </div>
  );
}

export default Profile;
