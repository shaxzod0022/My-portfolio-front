import { styles } from "@/styles/styles";
import { CircleCheck, CircleX } from "lucide-react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  errorMessage: string | null;
  successMessage: string | null;
}

const BackMessage = ({ errorMessage, successMessage }: Props) => {
  const message = errorMessage || successMessage;
  const isError = Boolean(errorMessage);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }} // o‘ngdan chiqadi
          animate={{ x: 0, opacity: 1 }} // joyiga keladi
          exit={{ x: "100%", opacity: 0 }} // yana o‘ngga chiqib ketadi
          transition={{ duration: 0.4 }}
          className={`fixed top-5 right-5 z-50 p-4 rounded-lg shadow-lg text-white ${
            styles.flex
          } ${isError ? "bg-red-500/80" : "bg-green-500/80"}`}
        >
          <span className="mr-2">
            {isError ? <CircleX /> : <CircleCheck />}
          </span>
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BackMessage;
