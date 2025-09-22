"use client";
import Btn from "@/components/helper/Btn";
import { styles } from "@/styles/styles";
import { Clock4, PencilLine, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AddSocialLink from "./AddSocialLink";
import { SocialLink } from "@/interfaces/link.interface";
import { LinkService } from "@/services/link.service";
import { handleError } from "@/lib/handleError";
import { formatToTashkent } from "@/lib/data";
import DeleteSocialLink from "./DeleteSocialLink";
import BackMessage from "../helper/BackMessage";
import UpdateSocialLink from "./UpdateSocialLink";

const SocialLinks = () => {
  const [hidden, setHidden] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMess, setErrorMess] = useState<string | null>(null);
  const [successMess, setSuccessMess] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>();
  const [data, setData] = useState<SocialLink[]>([]);
  const [deleteData, setDeleteData] = useState<{
    show: boolean;
    delData: SocialLink | null;
  }>({ show: false, delData: null });
  const [updateData, setUpdateData] = useState<{
    show: boolean;
    updId: string | null;
  }>({ show: false, updId: null });
  const [lang, setLang] = useState<"uz" | "ru" | "en">("uz");

  useEffect(() => {
    const getLink = async () => {
      setLoading(true);
      try {
        const response = await LinkService.getAllLinks(lang);
        if (response) {
          setData(response);
        }
      } catch (err) {
        const error = handleError(err);
        setMessage(error);
      } finally {
        setLoading(false);
      }
    };

    getLink();
  }, [lang]);

  const deleteLink = (id: string) => {
    const deletedData = data.find((item) => item._id === id) || null;
    setDeleteData({ ...deleteData, show: true, delData: deletedData });
  };
  const updateLink = (id: string) => {
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
        <h3 className={`${styles.h3}`}>Social links</h3>
        <Btn title="Add" onClick={() => setHidden(true)} />
        <AddSocialLink
          onSuccess={(newLink) => setData((prev) => [newLink, ...prev])}
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
              <h4 className={`${styles.h4} capitalize `}>{item.linkName}</h4>
              <Link
                target="_blank"
                href={item.linkPathname}
                className={`${styles.p} text-blue-500 leading-tight`}
              >
                Go to link
              </Link>
              <p className={`${styles.span} text-sm`}>
                {formatToTashkent(item.updatedAt)}
              </p>
              <p className={`${styles.span} text-sm`}>
                {formatToTashkent(item.createdAt)}
              </p>
              <div className={`${styles.flex} mt-5 gap-3 flex-wrap`}>
                <button
                  onClick={() => updateLink(item._id)}
                  className={`bg-green-500 p-1.5 rounded-lg w-fit text-white hover:bg-green-400 transition-all duration-200 active:bg-green-600`}
                >
                  <PencilLine className="w-4 h-4" />
                </button>
                <UpdateSocialLink
                  hidden={updateData.show}
                  show={() => setUpdateData({ show: false, updId: null })}
                  sucMess={(message) => setSuccessMess(message)}
                  errMess={(message) => setErrorMess(message)}
                  id={updateData.updId}
                  onSuccess={(newLink) =>
                    setData(
                      data.map((i) => (i._id === newLink._id ? newLink : i))
                    )
                  }
                />
                <button
                  onClick={() => deleteLink(item._id)}
                  className={`bg-red-500 p-1.5 rounded-lg w-fit text-white hover:bg-red-400 transition-all duration-200 active:bg-red-600`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <DeleteSocialLink
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

export default SocialLinks;
