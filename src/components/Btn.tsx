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
      className={`${newClass} cursor-pointer font-semibold bg-blue-950 text-white rounded-lg py-1 px-7`}
    >
      {disabled ? <span className="btn__loader"></span> : title}
    </button>
  );
};

export default Btn;
