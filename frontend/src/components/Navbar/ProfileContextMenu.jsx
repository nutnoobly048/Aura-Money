import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LogOut, CircleUser } from 'lucide-react';
import { motion } from "framer-motion";

const ProfileContextMenu = ({ setPageOpen, setMBProfileOpen }) => {

  const navigate = useNavigate();
  const Logout = async () => {
    try {
      const data = await axios.get("http://localhost:5000/logout");
      navigate("/login_register");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className='z-10 absolute top-[calc(100%+3px)] right-0 flex flex-col bg-zinc-50 border-2 border-ui-green2 
      rounded-bl-2xl rounded-tr-2xl shadow-md font-semibold'
    >
      <motion.button
        variants={itemVariants}
        onClick={() => {
          setPageOpen("profile");
          setMBProfileOpen(prev => !prev);
        }}
        className="flex items-center gap-x-2 p-3"
      >
        <CircleUser className="text-ui-green2"/>
        <p>Profile</p>
      </motion.button>

      <motion.button 
        variants={itemVariants}
        onClick={Logout} 
        className="flex items-center gap-x-2 p-3"
      >
        <LogOut className="text-ui-green2"/>
        <p>Logout</p>
      </motion.button>
    </motion.div>
  );
};
export default ProfileContextMenu;


const containerVariants = {
  hidden: { opacity: 0, y: -8 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 22,
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 28 },
  },
};