"use client";
import Btn from "@/components/helper/Btn";
import { styles } from "@/styles/styles";
import { Clock4, PencilLine, Trash2 } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { handleError } from "@/lib/handleError";
import { formatToTashkent } from "@/lib/data";
import BackMessage from "../helper/BackMessage";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import AddSkills from "./AddSkills";
import DeleteSkills from "./DeleteSkills";
import UpdateSkills from "./UpdateSkills";
import { Skills } from "@/interfaces/skill.interface";
import { SkillService } from "@/services/skill.service";

interface Props {
  skillData: Skills[];
}

const SkillsComponent = () => {
  const [hidden, setHidden] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMess, setErrorMess] = useState<string | null>(null);
  const [successMess, setSuccessMess] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>();
  const [data, setData] = useState<Skills[]>([]);
  const [deleteData, setDeleteData] = useState<{
    show: boolean;
    delData: Skills | null;
  }>({ show: false, delData: null });
  const [updateData, setUpdateData] = useState<{
    show: boolean;
    updId: string | null;
  }>({ show: false, updId: null });
  const lang = useSelector((state: RootState) => state.language.lang);

  const getSkills = useCallback(async () => {
    setLoading(true);
    try {
      const response = await SkillService.getAllSkills(lang);
      if (response) setData(response);
      console.log(response);
    } catch (err) {
      setMessage(handleError(err));
    } finally {
      setLoading(false);
    }
  }, [lang]);

  useEffect(() => {
    getSkills();
  }, [getSkills]);

  const deleteSkill = (id: string) => {
    const deletedData = data.find((item) => item._id === id) || null;
    setDeleteData({ ...deleteData, show: true, delData: deletedData });
  };
  const updateSkill = (id: string) => {
    const updatedData = data.find((item) => item._id === id) || null;
    setUpdateData({
      ...updateData,
      show: true,
      updId: updatedData?._id || null,
    });
  };

  const closeBlur = () => {
    setHidden(false);
    setDeleteData({ ...deleteData, show: false, delData: null });
    setUpdateData({ ...updateData, show: false, updId: null });
  };

  if (loading || !data) {
    return (
      <div className={`${styles.flexCenter} py-10`}>
        <div className="data__loader"></div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded`}>
      <div className={`${styles.flexBetween} gap-4 p-4`}>
        <h3 className={`${styles.h3}`}>Skills</h3>
        <Btn title="Add" onClick={() => setHidden(true)} />
        <AddSkills
          onSuccess={(newSkill) => setData((prev) => [newSkill, ...prev])}
          hidden={hidden}
          show={() => setHidden(false)}
          errMess={(message) => setErrorMess(message)}
          sucMess={(message) => setSuccessMess(message)}
        />
        <div
          onClick={closeBlur}
          className={`fixed top-0 left-0 ${
            hidden || deleteData.show || updateData.show
              ? "bg-black/40 w-screen h-screen z-40 backdrop-blur-sm"
              : ""
          }`}
        />
      </div>
      <div className={`${styles.flex} flex-wrap p-4`}>
        {data.length === 0 ? (
          <div className="w-full">
            <h3
              className={`${styles.h3} ${styles.flexCenter} gap-2 text-center w-full`}
            >
              <span>There is no data in the database</span>
              <Clock4 />
            </h3>
          </div>
        ) : (
          data.map((item) => (
            <div
              key={item._id}
              className={`bg-slate-100 border-5 border-white p-3 w-1/2 md:w-1/5 rounded-lg`}
            >
              <div className={`${styles.flex} gap-1`}>
                <i className={`${item.skillIcon} text-2xl`}></i>
                <h4 className={`${styles.h4} capitalize`}>{item.skillName}</h4>
              </div>
              <p className={`${styles.span} text-[12px]`}>
                {formatToTashkent(item.updatedAt)}
              </p>
              <p className={`${styles.span} text-[12px]`}>
                {formatToTashkent(item.createdAt)}
              </p>
              <div className={`${styles.flex} mt-5 gap-3 flex-wrap`}>
                <button
                  onClick={() => updateSkill(item._id)}
                  className={`bg-green-500 p-1.5 rounded-lg w-fit text-white hover:bg-green-400 transition-all duration-200 active:bg-green-600`}
                >
                  <PencilLine className="w-4 h-4" />
                </button>
                <UpdateSkills
                  hidden={updateData.show}
                  show={() => setUpdateData({ show: false, updId: null })}
                  sucMess={(message) => setSuccessMess(message)}
                  errMess={(message) => setErrorMess(message)}
                  id={updateData.updId}
                  onSuccess={(newSkill) =>
                    setData(
                      data.map((i) => (i._id === newSkill._id ? newSkill : i))
                    )
                  }
                />
                <button
                  onClick={() => deleteSkill(item._id)}
                  className={`bg-red-500 p-1.5 rounded-lg w-fit text-white hover:bg-red-400 transition-all duration-200 active:bg-red-600`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <DeleteSkills
                  hidden={deleteData.show}
                  show={() => setDeleteData({ show: false, delData: null })}
                  data={deleteData.delData}
                  sucMess={(message) => setSuccessMess(message)}
                  errMess={(message) => setErrorMess(message)}
                  onSuccess={(deletedId) =>
                    setData((prev) =>
                      prev.filter((item) => item._id !== deletedId)
                    )
                  }
                />
              </div>
            </div>
          ))
        )}
      </div>
      <BackMessage errorMessage={errorMess} successMessage={successMess} />
    </div>
  );
};

export default SkillsComponent;
