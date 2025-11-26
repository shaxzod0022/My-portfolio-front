"use client";
import Btn from "@/components/helper/Btn";
import { handleError } from "@/lib/handleError";
import { LinkService } from "@/services/link.service";
import { styles } from "@/styles/styles";
import React, { useState } from "react";
import { AboutCreate } from "@/interfaces/about.interface";

interface Props {
  hidden: boolean;
  show?: () => void;
  onSuccess: (newLink: AboutCreate) => void;
  errMess?: (message: string | null) => void;
  sucMess?: (message: string | null) => void;
}

const AuthorCreate = ({ hidden, show, onSuccess, errMess, sucMess }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState<AboutCreate>({
    trAuthorName: {
      uz: { authorName: "" },
      ru: { authorName: "" },
      en: { authorName: "" },
    },
    trTitle: {
      uz: { title: "" },
      ru: { title: "" },
      en: { title: "" },
    },
    trDes: {
      uz: { description: "" },
      ru: { description: "" },
      en: { description: "" },
    },
    image: "",
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
          trAuthorName: {
            uz: { authorName: "" },
            ru: { authorName: "" },
            en: { authorName: "" },
          },
          trTitle: {
            uz: { title: "" },
            ru: { title: "" },
            en: { title: "" },
          },
          trDes: {
            uz: { description: "" },
            ru: { description: "" },
            en: { description: "" },
          },
          image: "",
        });
        // muvaffaqiyatli qo‘shildi
        sucMess?.("Author created successfully");
        // onSuccess(response);

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
      } bg-white rounded-xl space-y-2 max-h-[90vh] overflow-y-auto scroll-hidden p-4 w-full sm:w-2/5 md:w-[40%] fixed top-1/2 left-1/2 -translate-1/2 z-50`}
    >
      <h3 className={`${styles.h3} mb-2`}>Create a Author</h3>
      <div className={`${styles.flexBetween} gap-3`}>
        <div className="lg:w-[47%] w-full">
          <label className="w-full" htmlFor="authorName_uz">
            Author name (UZ)
          </label>
          <input
            type="text"
            value={form.trAuthorName.uz.authorName}
            id="authorName_uz"
            required
            onChange={(e) =>
              setForm({
                ...form,
                trAuthorName: {
                  ...form.trAuthorName,
                  uz: { authorName: e.target.value },
                },
              })
            }
            className="outline-none border border-blue-900 rounded w-full p-2 mb-3"
            placeholder="Shaxzod Ilgeldiyev"
          />
        </div>
        <div className="lg:w-[47%] w-full">
          <label className="w-full" htmlFor="authorName_ru">
            Author name (RU)
          </label>
          <input
            type="text"
            value={form.trAuthorName.ru.authorName}
            id="authorName_ru"
            required
            onChange={(e) =>
              setForm({
                ...form,
                trAuthorName: {
                  ...form.trAuthorName,
                  ru: { authorName: e.target.value },
                },
              })
            }
            className="outline-none border border-blue-900 rounded w-full p-2 mb-3"
            placeholder="Шахзод Илгелдиев"
          />
        </div>
      </div>
      <div className={`${styles.flexBetween} gap-3`}>
        <div className="lg:w-[47%] w-full">
          <label className="w-full" htmlFor="authorName_en">
            Author name (EN)
          </label>
          <input
            type="text"
            value={form.trAuthorName.en.authorName}
            id="authorName_en"
            required
            onChange={(e) =>
              setForm({
                ...form,
                trAuthorName: {
                  ...form.trAuthorName,
                  en: { authorName: e.target.value },
                },
              })
            }
            className="outline-none border border-blue-900 rounded w-full p-2"
            placeholder="Shakhzod Ilgeldiyev"
          />
        </div>
        <div className="lg:w-[47%] flex flex-col w-full">
          <label className="w-full">Image upload</label>
          <div className="flex gap-1">
            <label
              className="p-2 bg-blue-950 rounded w-fit cursor-pointer hover:bg-blue-900 active:bg-blue-950 text-white"
              htmlFor="image"
            >
              Upload
              <input
                type="file"
                accept="image/*"
                value={form.trAuthorName.ru.authorName}
                id="image"
                required
                className="hidden"
              />
            </label>
            <p className="w-full border border-blue-900 rounded p-2">hello</p>
          </div>
        </div>
      </div>
      <div className="w-full">
        <label className="w-full" htmlFor="title_uz">
          Title (UZ)
        </label>
        <input
          value={form.trTitle.uz.title}
          id="title_uz"
          required
          onChange={(e) =>
            setForm({
              ...form,
              trTitle: {
                ...form.trTitle,
                uz: { title: e.target.value },
              },
            })
          }
          className="outline-none border border-blue-900 rounded w-full p-2"
          placeholder="Sarlavha"
        />
      </div>
      <div className="w-full">
        <label className="w-full" htmlFor="title_ru">
          Title (RU)
        </label>
        <input
          value={form.trTitle.ru.title}
          id="title_ru"
          required
          onChange={(e) =>
            setForm({
              ...form,
              trTitle: {
                ...form.trTitle,
                ru: { title: e.target.value },
              },
            })
          }
          className="outline-none border border-blue-900 rounded w-full p-2"
          placeholder="Заголовок"
        />
      </div>
      <div className="w-full">
        <label className="w-full" htmlFor="title_en">
          Title (EN)
        </label>
        <input
          value={form.trTitle.en.title}
          id="title_en"
          required
          onChange={(e) =>
            setForm({
              ...form,
              trTitle: {
                ...form.trTitle,
                en: { title: e.target.value },
              },
            })
          }
          className="outline-none border border-blue-900 rounded w-full p-2"
          placeholder="Title"
        />
      </div>
      <div className="w-full">
        <label className="w-full" htmlFor="description_uz">
          Description (UZ)
        </label>
        <textarea
          value={form.trDes.uz.description}
          id="description_uz"
          required
          onChange={(e) =>
            setForm({
              ...form,
              trDes: {
                ...form.trDes,
                uz: { description: e.target.value },
              },
            })
          }
          className="outline-none border border-blue-900 rounded w-full p-2"
          placeholder="Ko'proq ma'lumot..."
        />
      </div>
      <div className="w-full">
        <label className="w-full" htmlFor="description_ru">
          Description (RU)
        </label>
        <textarea
          value={form.trDes.ru.description}
          id="description_ru"
          required
          onChange={(e) =>
            setForm({
              ...form,
              trDes: {
                ...form.trDes,
                ru: { description: e.target.value },
              },
            })
          }
          className="outline-none border border-blue-900 rounded w-full p-2"
          placeholder="Дополнительная информация..."
        />
      </div>
      <div className="w-full">
        <label className="w-full" htmlFor="description_en">
          Description (EN)
        </label>
        <textarea
          value={form.trDes.en.description}
          id="description_en"
          required
          onChange={(e) =>
            setForm({
              ...form,
              trDes: {
                ...form.trDes,
                en: { description: e.target.value },
              },
            })
          }
          className="outline-none border border-blue-900 rounded w-full p-2"
          placeholder="More information..."
        />
      </div>

      <div className={`${styles.flex} gap-3 mt-3`}>
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

export default AuthorCreate;
