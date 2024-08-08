import { useEffect, useState } from "react";
import { Box } from "../components/Box";
import axios from "axios";
import toast from "react-hot-toast";

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
    } catch (error) {
      toast.error("Error fetching dashboard data");
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

  return (
    <div>
      <h2 className="text-2xl font-semibold text-secondary mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Box>
          <h3 className="text-lg font-semibold text-primary mb-2">
            Total Users
          </h3>
          <p className="text-3xl font-bold text-secondary">
            {statistics?.totalUsers}
          </p>
        </Box>

        <Box>
          <h3 className="text-lg font-semibold text-primary mb-2">
            Active Sessions Today
          </h3>
          <p className="text-3xl font-bold text-secondary">
            {statistics?.activeSessionsToday}
          </p>
        </Box>

        <Box>
          <h3 className="text-lg font-semibold text-primary mb-2">
            Avg Active Sessions Last 7 Days
          </h3>
          <p className="text-3xl font-bold text-secondary">
            {statistics?.averageActiveSessions7Days}
          </p>
        </Box>
      </div>
      
      <div className="mt-8">
      <Box>
        <h2 className="text-xl font-bold mb-4">User Database</h2>
        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user.id} className="border rounded p-4">
              <div className="font-semibold text-lg">{user.email}</div>
              <div className="text-sm text-gray-600">
                <p>Sign Up Date: {new Date(user.createdAt).toLocaleString()}</p>
                <p>Login Count: {user.loginCount}</p>
                <p>Last Logout: {user.lastLogoutAt ? new Date(user.lastLogoutAt).toLocaleString() : "N/A"}</p>
              </div>
            </li>
          ))}
        </ul>
      </Box>
    </div>
    </div>
  );
}
