"use client";
import Btn from "@/components/helper/Btn";
import { Skills } from "@/interfaces/skill.interface";
import { handleError } from "@/lib/handleError";
import { SkillService } from "@/services/skill.service";
import { styles } from "@/styles/styles";
import React, { useState } from "react";

interface Props {
  hidden: boolean;
  show?: () => void;
  data?: Skills | null;
  onSuccess: (id: string) => void;
  errMess?: (message: string | null) => void;
  sucMess?: (message: string | null) => void;
}

const DeleteSkills = ({
  hidden,
  show,
  data,
  onSuccess,
  errMess,
  sucMess,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteSkill = async () => {
    setLoading(true);
    if (!data) return null;
    const token = sessionStorage.getItem("token") || "";
    try {
      const response = await SkillService.deleteSkill(data?._id, token);
      if (response) {
        sucMess?.("Skill deleted successfully.");
        onSuccess(data._id);
        show?.();
        setInterval(() => sucMess?.(null), 3000);
      }
    } catch (err) {
      const errorMessage = handleError(err);
      errMess?.(errorMessage);
      setInterval(() => errMess?.(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  if (!data) return null;

  return (
    <>
      <div
        className={`${
          !hidden ? "hidden" : "block"
        } bg-white rounded-xl p-4 w-full sm:w-2/5 md:w-[40%] fixed top-1/2 left-1/2 -translate-1/2 z-50`}
      >
        <h2 className={`${styles.h2} mb-5 text-center`}>
          Will you remove the{" "}
          <span className="text-red-500">{data.skillName}</span> link?
        </h2>
        <div className={`${styles.flexCenter} gap-3`}>
          <Btn disabled={loading} title="Yes" onClick={deleteSkill} />
          <Btn
            title="No"
            newClass="bg-red-500 hover:bg-red-400 active:bg-red-600"
            onClick={show}
          />
        </div>
      </div>
    </>
  );
};

export default DeleteSkills;
