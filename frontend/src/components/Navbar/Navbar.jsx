import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";
import {
  faBars,
  faUser,
  faSackDollar,
  faChartSimple,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import MobileSideBar from "./MobileSideBar";
import { AccountSelectBtn } from "./AccountSelectBtn";
import ProfileContextMenu from "./ProfileContextMenu";

export default function Navbar({ setPageOpen }) {
  const [isMSBOpen, setMSBOpen] = useState(false);
  const [isMBProfileOpen, setMBProfileOpen] = useState(false);

  return (
    <nav className="relative flex justify-between items-center mb-1 sm:pr-2 sm:flex-col sm:justify-center!">
      <MobileSideBar isMSBOpen={isMSBOpen} setMSBOpen={setMSBOpen} setPageOpen={setPageOpen} />

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

      <motion.div
        whileTap={{ scale: 0.8 }}
      >
        <FontAwesomeIcon
          size="2xl"
          icon={faUser}
          onClick={() => setMBProfileOpen((prev) => !prev)}
          className="text-white cursor-pointer sm:hidden!"
        />
      </motion.div>
      <AnimatePresence>
        {isMBProfileOpen && (
          <ProfileContextMenu
            setMBProfileOpen={setMBProfileOpen}
            setPageOpen={setPageOpen}
          />
        )}
      </AnimatePresence>
    </nav>
  );
}
