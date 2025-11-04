import { useState, useRef, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { User, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { APIContext } from "../APIProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DesktopProfileIcon = ({ setPageOpen }) => {
  const [isDesktopProfileContextMenuOpen, setDesktopProfileContextMenu] = useState(false);
  const DPIArea = useRef();
  const { userData } = useContext(APIContext);
  
  useEffect(() => {
    if (!isDesktopProfileContextMenuOpen) return;
    const handler = (e) => {
      if (!DPIArea.current.contains(e.target)) {
        setDesktopProfileContextMenu(!isDesktopProfileContextMenuOpen);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    }
    
  }, [isDesktopProfileContextMenuOpen]);

  return (
    <div ref={DPIArea} className="hidden w-full justify-end items-center sm:flex!">
      <button
        className="min-w-30 relative flex justify-between items-center border-2 border-zinc-400 rounded-3xl py-1 px-1 gap-x-5 m-2 cursor-pointer"
        onClick={() =>
          setDesktopProfileContextMenu(!isDesktopProfileContextMenuOpen)
        }
      >
        <div className="flex justify-center items-center gap-x-2 cursor-pointer">
          <img src={userData?.profile_img} className="w-[3vh] rounded-full" />
          <label className="cursor-pointer">{userData?.username}</label>
        </div>
        <FontAwesomeIcon icon={faCaretDown} />
        <DPIContextMenu
          isDesktopProfileContextMenuOpen={isDesktopProfileContextMenuOpen}
          setPageOpen={setPageOpen}
        />
      </button>
    </div>
  );
};
export default DesktopProfileIcon;

const DPIContextMenu = ({ isDesktopProfileContextMenuOpen, setPageOpen }) => {
  const containerVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scaleY: 0.95,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        staggerChildren: 0.03,
        staggerDirection: -1,
      },
      transitionEnd: { pointerEvents: "none" },
    },
    visible: {
      opacity: 1,
      y: 0,
      scaleY: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        staggerChildren: 0.05,
      },
      pointerEvents: "auto",
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const menuItems = [
    { name: "Profile", icon: User, action: () => setPageOpen("Profile") },
    {
      name: "Logout",
      icon: LogOut,
      action: () => Logout(),
    },
  ];

  const navigate = useNavigate();
  const Logout = async () => {
    try {
      const data = await axios.get(`${import.meta.env.VITE_URL_API}/logout`);
      navigate("/login_register");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      className="absolute w-full top-[calc(100%+5px)] left-1/2 -translate-x-1/2 flex flex-col justify-center rounded-xl"
      variants={containerVariants}
      initial="hidden"
      animate={isDesktopProfileContextMenuOpen ? "visible" : "hidden"}
    >
      {menuItems.map((item, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          onClick={item.action}
          className={`flex justify-center items-center gap-x-3 p-2 bg-white shadow-md hover:bg-zinc-300 cursor-pointer
            ${index === 0 ? "rounded-t-xl" : ""}
            ${index === menuItems.length - 1 ? "rounded-b-xl" : ""}`}
        >
          <item.icon />
          <p>{item.name}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};
