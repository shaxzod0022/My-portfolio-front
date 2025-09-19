import { styles } from "@/styles/styles";
import React, { FC } from "react";

interface Btn {
  title: string;
  newClass?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Btn: FC<Btn> = ({ title, onClick, disabled, newClass }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${newClass} cursor-pointer font-semibold ${
        disabled ? "bg-blue-800 !cursor-no-drop" : "bg-blue-950 hover:bg-blue-900 active:bg-blue-800"
      } text-white ${styles.flexCenter} rounded-lg sm:py-2 py-1 sm:px-7 px-4`}
    >
      {disabled ? <span className="btn_loader"></span> : title}
    </button>
  );
};

export default Btn;
