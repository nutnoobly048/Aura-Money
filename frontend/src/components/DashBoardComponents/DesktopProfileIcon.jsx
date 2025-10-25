import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { User, LogOut } from "lucide-react";
import { motion } from "framer-motion";

const DesktopProfileIcon = ({ setPageOpen }) => {
  const [isDesktopProfileContextMenuOpen, setDesktopProfileContextMenu] = useState(false);
  return (
    <div className="hidden w-full justify-end items-center sm:flex!">
      <button
        className="relative flex justify-between items-center border-2 border-zinc-400 rounded-3xl py-1 px-1 gap-x-5 m-2 cursor-pointer"
        onClick={() =>
          setDesktopProfileContextMenu(!isDesktopProfileContextMenuOpen)
        }
      >
        <div className="flex justify-center items-center gap-x-2 cursor-pointer">
          <img src="Profile.jpg" className="w-[3vh] rounded-full" />
          <label className="cursor-pointer">yeaimningning</label>
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
    { name: "Profile", icon: User, action: () => setPageOpen("profile") },
    {
      name: "Logout",
      icon: LogOut,
      action: () => console.log("Logout clicked"),
    },
  ];

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
