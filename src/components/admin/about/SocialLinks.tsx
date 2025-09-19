"use client";
import Btn from "@/components/helper/Btn";
import { styles } from "@/styles/styles";
import { PencilLine, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AddSocialLink from "./AddSocialLink";
import { SocialLink } from "@/interfaces/link.interface";

const SocialLinks = () => {
  const [hidden, setHidden] = useState<boolean>(false);
  const [data, setData] = useState<SocialLink[]>([]);

  useEffect(()=>{

  },[])

  return (
    <div className={`bg-white rounded`}>
      <div className={`${styles.flexBetween} gap-4 p-4`}>
        <h3 className={`${styles.h3}`}>Social links</h3>
        <Btn title="Add" onClick={() => setHidden(true)} />
        <AddSocialLink hidden={hidden} show={() => setHidden(false)} />
        <div
          onClick={() => setHidden(false)}
          className={`fixed top-0 left-0 ${
            hidden ? "bg-black/40 w-screen h-screen z-40 backdrop-blur-sm" : ""
          }`}
        />
      </div>
      <div className={`${styles.flexBetween} gap-4 p-4`}>
        <div className={`bg-slate-100 p-3 w-1/2 md:w-1/5 rounded-lg`}>
          <h4 className={`${styles.h4}`}>Link name</h4>
          <Link href={"#"} className={`${styles.p} leading-tight`}>
            Link pathname
          </Link>
          <div className={`${styles.flex} mt-5 gap-3 flex-wrap`}>
            <button
              className={`bg-green-500 p-1.5 rounded-lg w-fit text-white hover:bg-green-400 transition-all duration-200 active:bg-green-600`}
            >
              <PencilLine className="w-4 h-4" />
            </button>
            <button
              className={`bg-red-500 p-1.5 rounded-lg w-fit text-white hover:bg-red-400 transition-all duration-200 active:bg-red-600`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;
