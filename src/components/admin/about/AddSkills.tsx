"use client";
import Btn from "@/components/helper/Btn";
import { handleError } from "@/lib/handleError";
import { styles } from "@/styles/styles";
import React, { useState } from "react";
import { CreateSkills, Skills } from "@/interfaces/skill.interface";
import { SkillService } from "@/services/skill.service";

interface Props {
  hidden: boolean;
  show?: () => void;
  onSuccess: (newLink: Skills) => void;
  errMess?: (message: string | null) => void;
  sucMess?: (message: string | null) => void;
}

const AddSkills = ({ hidden, show, onSuccess, errMess, sucMess }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<CreateSkills>({
    translations: {
      uz: { skillName: "" },
      ru: { skillName: "" },
      en: { skillName: "" },
    },
    skillIcon: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = sessionStorage.getItem("token") || "";

    try {
      const response = await SkillService.createSkill(form, token);

      if (response) {
        // forma tozalanadi
        setForm({
          translations: {
            uz: { skillName: "" },
            ru: { skillName: "" },
            en: { skillName: "" },
          },
          skillIcon: "",
        });
        // muvaffaqiyatli qo‘shildi
        sucMess?.("Skill added successfully.");
        onSuccess(response);
        // modalni yopamiz
        show?.();

        // xabarni 3 soniyada yo‘qotamiz
        setTimeout(() => sucMess?.(null), 3000);
      }
    } catch (err) {
      const errorMessage = handleError(err);
      errMess?.(errorMessage);

      // xabarni 3 soniyada yo‘qotamiz
      setTimeout(() => errMess?.(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${
        !hidden ? "hidden" : "block"
      } bg-white rounded-xl p-4 w-full sm:w-2/5 md:w-[40%] fixed top-1/2 left-1/2 -translate-1/2 z-50`}
    >
      <h3 className={`${styles.h3} mb-2`}>Add skill</h3>
      <div className={`${styles.flexBetween} gap-3`}>
        <div className="lg:w-[47%] w-full">
          <label className="w-full" htmlFor="skillName_uz">
            Skill name (UZ)
          </label>
          <input
            type="text"
            value={form.translations.uz.skillName}
            id="skillName_uz"
            required
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
            type="text"
            value={form.translations.en.skillName}
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
            id="skillIcon"
            value={form.skillIcon}
            required
            onChange={(e) => setForm({ ...form, skillIcon: e.target.value })}
            className="outline-none border border-blue-900 rounded w-full p-2"
            placeholder="fa-brands fa-react"
          />
        </div>
      </div>
      <div className={`${styles.flex} gap-3`}>
        <Btn disabled={loading} title="Add" />
        <Btn
          type="button"
          title="Cancel"
          newClass="bg-red-500 hover:bg-red-400 active:bg-red-600"
          onClick={show}
        />
      </div>
    </form>
  );
};

export default AddSkills;
