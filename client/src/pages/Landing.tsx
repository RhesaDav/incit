import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '../components/Button'

export default function Landing() {
  const navigate = useNavigate()
  return (
    <div className="bg-base-50 min-h-screen flex flex-col">
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 bg-base-100"
      >
        <nav className="flex justify-between items-center max-w-6xl mx-auto">
          <motion.h1 
            whileHover={{ scale: 1.1 }}
            className="text-2xl font-bold text-primary"
          >
            RhesaDav
          </motion.h1>
          <div>
            <Button onClick={() => navigate("/login")} className="mr-2 hover:scale-105 transition-transform">Login</Button>
            <Button onClick={() => navigate("/register")} className="hover:scale-105 transition-transform">Register</Button>
          </div>
        </nav>
      </motion.header>
      <main className="flex-grow flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <motion.h2 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-4xl font-bold text-secondary mb-4"
          >
            Welcome to Rhesa's App
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-xl text-accent mb-8"
          >
            ReactJS Developer | Mobile Developer | Java Developer | Fullstack Developer | Angular Developer
          </motion.p>
          <Button variant="primary" className="hover:scale-105 transition-transform">Get Started</Button>
        </motion.div>
      </main>
      <motion.footer 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-base-100 p-4 text-center text-gray-400"
      >
        © 2024 RhesaDav. All rights reserved.
      </motion.footer>
    </div>
  )
}