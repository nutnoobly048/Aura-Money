import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import {
  faBars,
  faUser,
  faSackDollar,
  faChartSimple,
  faEllipsis,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { Pencil } from "lucide-react";
import MobileSideBar from "./MobileSideBar";

export default function Navbar({
  setPageOpen,
  isProfileContextMenuOpen,
  setProfileContextMenuOpen,
}) {
  const [isMSBOpen, setMSBOpen] = useState(false);

  return (
    <nav className="relative flex justify-between items-center mb-1 sm:pr-2 sm:flex-col sm:justify-center!">
      <MobileSideBar
        isMSBOpen={isMSBOpen}
        setPageOpen={setPageOpen}
      />

      <motion.div
        onClick={() => setMSBOpen(!isMSBOpen)}
        whileTap={{ scale: 0.8 }}
      >
        <FontAwesomeIcon
          size="2xl"
          icon={faBars}
          className="text-white sm:hidden!"
        />
      </motion.div>
      <img
        src="logo.svg"
        className="w-[12vh] md:w-[calc(100%-50px)]! sm:absolute sm:top-0 sm:left-1/2 sm:pr-2 sm:-translate-x-1/2"
      />
      <AccountSelectBtn
        setPageOpen={setPageOpen}
        className="hidden sm:flex! text-white border-white -translate-y-2/1"
      />
      <button
        onClick={() => setPageOpen("account")}
        className="hidden w-full sm:flex! items-center gap-x-2 font-bold text-white pr-3 py-2.5 cursor-pointer"
      >
        <FontAwesomeIcon size="xl" icon={faSackDollar} />
        <p className="text-xl">Account</p>
      </button>
      <button
        onClick={() => setPageOpen("Stats")}
        className="hidden w-full sm:flex! items-center gap-x-2 font-bold text-white pr-3 py-2.5 cursor-pointer"
      >
        <FontAwesomeIcon size="xl" icon={faChartSimple} />
        <p className="text-xl">Stats</p>
      </button>
      <button
        onClick={() => setPageOpen("More")}
        className="hidden w-full sm:flex! items-center gap-x-2 font-bold text-white pr-3 py-2.5 cursor-pointer"
      >
        <FontAwesomeIcon size="xl" icon={faEllipsis} />
        <p className="text-xl">More</p>
      </button>
      <FontAwesomeIcon
        size="2xl"
        icon={faUser}
        className="text-white cursor-pointer sm:hidden!"
        onClick={() => setProfileContextMenuOpen(!isProfileContextMenuOpen)}
      />
    </nav>
  );
}

export const AccountSelectBtn = ({ setPageOpen, className }) => {
  const [isAccountListOpen, setAccountListOpen] = useState(false);

  const iconVariants = {
    rest: {
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
    hover: {
      y: -3,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.4,
      },
    },
  };

  const baseClasses =
    "relative flex items-center font-bold gap-x-1 border-2 rounded-full px-2 py-1 cursor-pointer";

  return (
    <motion.div
      onClick={() => setAccountListOpen(!isAccountListOpen)}
      className={twMerge(baseClasses, className)}
      whileTap={{ scale: 0.95 }}
      initial="rest"
      whileHover="hover"
    >
      <p>AccountName #1</p>
      <motion.div variants={iconVariants}>
        <FontAwesomeIcon icon={faCaretDown} />
      </motion.div>
      <AccountList
        isAccountListOpen={isAccountListOpen}
        setPageOpen={setPageOpen}
      />
    </motion.div>
  );
};

const AccountList = ({ isAccountListOpen, setPageOpen }) => {
  const accounts = [
    { name: "Account #1", fn: () => setPageOpen("accountSetting") },
    { name: "Account #2", fn: () => setPageOpen("accountSetting") },
    { name: "Account #3", fn: () => setPageOpen("accountSetting") },
    { name: "Account #4", fn: () => setPageOpen("accountSetting") },
  ];

  const containerVariants = {
    hidden: {
      opacity: 0,
      transition: {
        staggerChildren: 0.03,
        staggerDirection: -1,
      },
      transitionEnd: { pointerEvents: "none" },
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.025,
      },
      pointerEvents: "auto",
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: -15,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      className="absolute top-[calc(100%+5px)] left-0 w-full flex flex-col justify-center items-center"
      variants={containerVariants}
      initial="hidden"
      animate={isAccountListOpen ? "visible" : "hidden"}
    >
      {accounts.map((item, index) => (
        <motion.div
          variants={itemVariants}
          key={index}
          className={`text-black p-3 w-full flex justify-between  bg-white hover:bg-zinc-200 px-3
          ${
            !index
              ? "rounded-t-xl"
              : index == accounts.length - 1
              ? "rounded-b-xl"
              : "rounded-none"
          }`}
          onClick={item.fn}
        >
          {item.name}
          <button
            onClick={(e) => {
              console.log("clicked at", item.name);
              e.stopPropagation();
            }}
            className="bg-ui-green1 rounded-full px-1 hover:scale-120 hover:bg-white"
          >
            <Pencil className="size-4 text-white hover:text-ui-green1" />
          </button>
        </motion.div>
      ))}
    </motion.div>
  );
};
