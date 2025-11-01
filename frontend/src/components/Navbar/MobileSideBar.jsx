import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSackDollar,
  faChartSimple,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { AccountSelectBtn } from "./AccountSelectBtn";

const containerVariants = {
  hidden: { opacity: 0, y: -8 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 22,
      staggerChildren: 0.04,
      delayChildren: 0.025,
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

function MobileSideBar({ setPageOpen, isMSBOpen, setMSBOpen}) {
  return (
    <AnimatePresence>
      {isMSBOpen && (
        <motion.nav
          variants={containerVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          className="z-10 absolute top-[calc(100%+3px)] w-1/2 left-0 flex flex-col bg-zinc-50 border-2 border-ui-green2 rounded-br-2xl rounded-tl-2xl shadow-md"
        >
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {setPageOpen("account");setMSBOpen(false)}}
            className="flex items-center gap-x-2 py-3 px-3"
          >
            <FontAwesomeIcon size="xl" icon={faSackDollar} className="text-ui-green2" />
            <p className="font-semibold">Account</p>
          </motion.button>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {setPageOpen("Stats");setMSBOpen(false)}}
            className="flex items-center gap-x-2 py-3 px-3"
          >
            <FontAwesomeIcon size="xl" icon={faChartSimple} className="text-ui-green2" />
            <p className="font-semibold">Stats</p>
          </motion.button>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {setPageOpen("More");setMSBOpen(false)}}
            className="flex items-center gap-x-2 py-3 px-3"
          >
            <FontAwesomeIcon size="xl" icon={faEllipsis} className="text-ui-green2" />
            <p className="font-semibold">More</p>
          </motion.button>


          <motion.div variants={itemVariants} className="m-2">
            <AccountSelectBtn setPageOpen={setPageOpen} className='border-2 text-white bg-ui-green1' />
          </motion.div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

export default MobileSideBar;
