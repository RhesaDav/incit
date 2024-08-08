import { motion } from 'framer-motion'
const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg p-8 shadow-lg"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="mt-4 text-primary font-semibold">Loading...</p>
        </motion.div>
      </div>
  )
}

export default Loading