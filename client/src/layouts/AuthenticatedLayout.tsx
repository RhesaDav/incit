import axios from 'axios';
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, Outlet, useNavigate } from 'react-router-dom'

export default function AuthenticatedLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_API}/auth/logout`, {}, { withCredentials: true });
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  const checkAuth = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BASE_API}/auth/check`, { withCredentials: true });
    } catch (error) {
      toast.error('Session expired. Please log in again.');
      navigate('/login');
    }
  };

  useEffect(() => {
    checkAuth();
  }, [navigate]);

  return (
    <div className="flex h-screen bg-base-50">
      {/* Sidebar */}
      <aside className={`bg-base-100 text-secondary w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out`}>
        <nav>
          <Link to="/dashboard" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-base-200">
            Dashboard
          </Link>
          <Link to="/profile" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-base-200">
            Profile
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-base-100 text-secondary">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <button onClick={toggleSidebar} className="text-secondary focus:outline-none md:hidden">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <h1 className="text-xl font-semibold ml-4">Rhesa's App</h1>
            </div>
            <div className="flex items-center">
              <button onClick={handleLogout} className="text-secondary hover:text-primary transition-colors duration-200">
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-base-50">
          <div className="container mx-auto px-6 py-8">
            <Outlet/>
          </div>
        </main>
      </div>
    </div>
  );

}