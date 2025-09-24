"use client";
import Btn from "@/components/helper/Btn";
import { CreateSkills, Skills } from "@/interfaces/skill.interface";
import { handleError } from "@/lib/handleError";
import { SkillService } from "@/services/skill.service";
import { RootState } from "@/store/store";
import { styles } from "@/styles/styles";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface Props {
  hidden: boolean;
  show?: () => void;
  onSuccess: (newLink: Skills) => void;
  id: string | null;
  errMess?: (message: string | null) => void;
  sucMess?: (message: string | null) => void;
}

const UpdateSkills = ({
  hidden,
  show,
  onSuccess,
  id,
  sucMess,
  errMess,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<CreateSkills>({
    translations: {
      uz: { skillName: "" },
      ru: { skillName: "" },
      en: { skillName: "" },
    },
    skillIcon: "",
  });

  const lang = useSelector((state: RootState) => state.language.lang);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return null;
      try {
        const response = await SkillService.getAllLang(id);
        if (response) {
          setForm({
            translations: {
              uz: { skillName: response.translations.uz.skillName || "" },
              ru: { skillName: response.translations.ru.skillName || "" },
              en: { skillName: response.translations.en.skillName || "" },
            },
            skillIcon: response.skillIcon || "",
          });
        }
      } catch (err) {
        const error = handleError(err);
        errMess?.(error);
        setTimeout(() => errMess?.(null), 3000);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = sessionStorage.getItem("token") || "";
    if (!id) return null;
    try {
      const response = await SkillService.updateSkill(form, token, id, lang);
      if (response) {
        sucMess?.("Skill updated successfully.");
        onSuccess(response);
        setForm({
          translations: {
            uz: { skillName: "" },
            ru: { skillName: "" },
            en: { skillName: "" },
          },
          skillIcon: "",
        });
        show?.();
        setTimeout(() => sucMess?.(null), 3000);
      }
    } catch (err) {
      const errorMessage = handleError(err);
      errMess?.(errorMessage);
      setTimeout(() => errMess?.(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  if (!id) {
    return null;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`${
        !hidden ? "hidden" : "block"
      } bg-white rounded-xl p-4 w-full sm:w-2/5 md:w-[40%] fixed top-1/2 left-1/2 -translate-1/2 z-50`}
    >
      <h3 className={`${styles.h3} mb-2`}>Update a social media link</h3>
      <div className={`${styles.flexBetween} gap-3`}>
        <div className="lg:w-[47%] w-full">
          <label className="w-full" htmlFor="skillName_uz">
            Skill name (UZ)
          </label>
          <input
            type="text"
            id="skillName_uz"
            required
            value={form.translations.uz.skillName}
            onChange={(e) =>
              setForm({
                ...form,
                translations: {
                  ...form.translations,
                  uz: { skillName: e.target.value },
                },
              })
            }
            className="outline-none border border-blue-900 rounded w-full p-2 mb-3"
            placeholder="React"
          />
        </div>
        <div className="lg:w-[47%] w-full">
          <label className="w-full" htmlFor="skillName_ru">
            Skill name (RU)
          </label>
          <input
            type="text"
            value={form.translations.ru.skillName}
            id="skillName_ru"
            required
            onChange={(e) =>
              setForm({
                ...form,
                translations: {
                  ...form.translations,
                  ru: { skillName: e.target.value },
                },
              })
            }
            className="outline-none border border-blue-900 rounded w-full p-2 mb-3"
            placeholder="React"
          />
        </div>
      </div>
      <div className={`${styles.flexBetween} gap-3 mb-5`}>
        <div className="lg:w-[47%] w-full">
          <label className="w-full" htmlFor="skillName_en">
            Skill name (EN)
          </label>
          <input
            value={form.translations.en.skillName}
            type="text"
            id="skillName_en"
            required
            onChange={(e) =>
              setForm({
                ...form,
                translations: {
                  ...form.translations,
                  en: { skillName: e.target.value },
                },
              })
            }
            className="outline-none border border-blue-900 rounded w-full p-2"
            placeholder="React"
          />
        </div>
        <div className="lg:w-[47%] w-full">
          <label className="w-full" htmlFor="skillIcon">
            Link pathname
          </label>
          <input
            type="text"
            value={form.skillIcon}
            id="skillIcon"
            required
            onChange={(e) => setForm({ ...form, skillIcon: e.target.value })}
            className="outline-none border border-blue-900 rounded w-full p-2"
            placeholder="fa-brands fa-react"
          />
        </div>
      </div>
      <div className={`${styles.flex} gap-3`}>
        <Btn disabled={loading} title="Update" />
        <Btn
          type="button"
          title="Cancel"
          newClass="bg-red-500 hover:bg-red-400 active:bg-red-600"
          onClick={() => {
            setForm({
              translations: {
                uz: { skillName: "" },
                ru: { skillName: "" },
                en: { skillName: "" },
              },
              skillIcon: "",
            });
            show?.();
          }}
        />
      </div>
    </form>
  );
};

export default UpdateSkills;
