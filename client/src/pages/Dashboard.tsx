import { useEffect, useState } from "react";
import { Box } from "../components/Box";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Loading from "../components/Loading";

interface User {
  id: number;
  email: string;
  createdAt: string;
  loginCount: number;
  lastLogoutAt: string | null;
}

interface Statistics {
  totalUsers: number;
  activeSessionsToday: number;
  averageActiveSessions7Days: number;
}

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
    fetchStatistics();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API}/user`,
        { withCredentials: true }
      );
      setUsers(response.data);
      setIsLoading(false);
    } catch (error) {
      toast.error("Error fetching dashboard data");
      setIsLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_API}/statistic`,
        { withCredentials: true }
      );
      setStatistics(response.data);
    } catch (error) {
      toast.error("Error fetching statistics");
    }
  };

  if (isLoading) {
    return (
      <Loading/>
    );
  }

  return (
    <div>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-semibold text-secondary mb-6"
      >
        Dashboard
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Box>
            <h3 className="text-lg font-semibold text-primary mb-2">
              Total Users
            </h3>
            <p className="text-3xl font-bold text-secondary">
              {statistics?.totalUsers}
            </p>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Box>
            <h3 className="text-lg font-semibold text-primary mb-2">
              Active Sessions Today
            </h3>
            <p className="text-3xl font-bold text-secondary">
              {statistics?.activeSessionsToday}
            </p>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Box>
            <h3 className="text-lg font-semibold text-primary mb-2">
              Avg Active Sessions Last 7 Days
            </h3>
            <p className="text-3xl font-bold text-secondary">
              {statistics?.averageActiveSessions7Days.toFixed(2)}
            </p>
          </Box>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8"
      >
        <Box>
          <h2 className="text-xl font-bold mb-4">User Database</h2>
          <ul className="space-y-4">
            {users.map((user) => (
              <motion.li
                key={user.id}
                className="border rounded p-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="font-semibold text-lg">{user.email}</div>
                <div className="text-sm text-gray-600">
                  <p>Sign Up Date: {new Date(user.createdAt).toLocaleString()}</p>
                  <p>Login Count: {user.loginCount}</p>
                  <p>
                    Last Logout:{" "}
                    {user.lastLogoutAt
                      ? new Date(user.lastLogoutAt).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </Box>
      </motion.div>
    </div>
  );
}