import { CircleCheck, CircleX } from "lucide-react";
import { createPortal } from "react-dom";
import { motion, spring } from "framer-motion";
function StatusPopup({ isSuccess }) {
  return createPortal(
    <motion.div className="fixed top-0 left-1/2 -translate-x-1/2 z-10 flex items-center gap-x-2 text-xl bg-white 
      rounded-2xl px-4 py-2 text-nowrap shadow-lg border border-zinc-300"
      initial={{y: '-100%'}}
      animate={{y: 20}}
      exit={{y: '-100%'}}
      transition={{type: spring, duration: 0.4}}
    >
      {!isSuccess && (
        <CircleX className="text-white bg-red-500 rounded-full" />
      )}
      {isSuccess && (
        <CircleCheck className="text-white bg-ui-green1 rounded-full" />
      )}
      {isSuccess ? 'New Transaction added' : 'Please complete the form'}
    </motion.div>,
    document.body
  );
}

export default StatusPopup;
