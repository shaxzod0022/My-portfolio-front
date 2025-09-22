"use client";
import Btn from "@/components/helper/Btn";
import { handleError } from "@/lib/handleError";
import { LinkService } from "@/services/link.service";
import { styles } from "@/styles/styles";
import React, { useState } from "react";
import { CreateLink, SocialLink } from "@/interfaces/link.interface";

interface Props {
  hidden: boolean;
  show?: () => void;
  onSuccess: (newLink: SocialLink) => void;
  errMess?: (message: string | null) => void;
  sucMess?: (message: string | null) => void;
}

const AddSocialLink = ({
  hidden,
  show,
  onSuccess,
  errMess,
  sucMess,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<CreateLink>({
    translations: {
      uz: { linkName: "" },
      ru: { linkName: "" },
      en: { linkName: "" },
    },
    linkPathname: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = sessionStorage.getItem("token") || "";

    try {
      const response = await LinkService.createLink(form, token);

      if (response) {
        // forma tozalanadi
        setForm({
          translations: {
            uz: { linkName: "" },
            ru: { linkName: "" },
            en: { linkName: "" },
          },
          linkPathname: "",
        });
        // muvaffaqiyatli qo‘shildi
        sucMess?.("Link added successfully.");
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
      <h3 className={`${styles.h3} mb-2`}>Add a social media link</h3>
      <div className={`${styles.flexBetween} gap-3`}>
        <div className="lg:w-[47%] w-full">
          <label className="w-full" htmlFor="linkName_uz">
            Link name (UZ)
          </label>
          <input
            type="text"
            value={form.translations.uz.linkName}
            id="linkName_uz"
            required
            onChange={(e) =>
              setForm({
                ...form,
                translations: {
                  ...form.translations,
                  uz: { linkName: e.target.value },
                },
              })
            }
            className="outline-none border border-blue-900 rounded w-full p-2 mb-3"
            placeholder="Github"
          />
        </div>
        <div className="lg:w-[47%] w-full">
          <label className="w-full" htmlFor="linkName_ru">
            Link name (RU)
          </label>
          <input
            type="text"
            value={form.translations.ru.linkName}
            id="linkName_ru"
            required
            onChange={(e) =>
              setForm({
                ...form,
                translations: {
                  ...form.translations,
                  ru: { linkName: e.target.value },
                },
              })
            }
            className="outline-none border border-blue-900 rounded w-full p-2 mb-3"
            placeholder="Гитхаб"
          />
        </div>
      </div>
      <div className={`${styles.flexBetween} gap-3 mb-5`}>
        <div className="lg:w-[47%] w-full">
          <label className="w-full" htmlFor="linkName_en">
            Link name (EN)
          </label>
          <input
            type="text"
            value={form.translations.en.linkName}
            id="linkName_en"
            required
            onChange={(e) =>
              setForm({
                ...form,
                translations: {
                  ...form.translations,
                  en: { linkName: e.target.value },
                },
              })
            }
            className="outline-none border border-blue-900 rounded w-full p-2"
            placeholder="Github"
          />
        </div>
        <div className="lg:w-[47%] w-full">
          <label className="w-full" htmlFor="linkPathname">
            Link pathname
          </label>
          <input
            type="text"
            id="linkPathname"
            value={form.linkPathname}
            required
            onChange={(e) => setForm({ ...form, linkPathname: e.target.value })}
            className="outline-none border border-blue-900 rounded w-full p-2"
            placeholder="https://github.com/username"
          />
        </div>
      </div>
      <div className={`${styles.flex} gap-3`}>
        <Btn disabled={loading} title="Add" />
        <Btn
          type="button"
          title="Cancel"
          newClass="bg-red-500 hover:bg-red-400 active:bg-red-300"
          onClick={show}
        />
      </div>
    </form>
  );
};

export default AddSocialLink;
