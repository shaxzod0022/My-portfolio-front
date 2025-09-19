import { myPhoto, nodejs, reactImg, tsImg } from "@/assets";
import { styles } from "@/styles/styles";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { use } from "react";

const Head = () => {
  const t = useTranslations("head");
  return (
    <div className={`${styles.flexBetween} gap-5 py-8`}>
      <div className="w-full md:w-[47%] space-y-4">
        <h1 className={`${styles.h1}`}>
          {t("title")}
          <span> Shaxzod</span>
        </h1>
        <p className={`${styles.p} `}>{t("description")}</p>
        <div className={`${styles.flex} gap-5`}>
          <div className={`${styles.flex} gap-2`}>
            <h2 className={`${styles.h2} text-blue-400`}>5+</h2>
            <p className={`${styles.h3} text-gray-500`}>{t("experience")}</p>
          </div>
          <div className={`${styles.flex} gap-2`}>
            <h2 className={`${styles.h2} text-blue-400`}>20+</h2>
            <p className={`${styles.h3} text-gray-500`}>{t("projects")}</p>
          </div>
        </div>
      </div>
      <div className={`${styles.flexCenter} relative -z-10 w-full md:w-[47%]`}>
        <Image
          className="lg:w-[60%] w-full rounded-4xl object-cover"
          src={myPhoto}
          alt="My Photo"
        />
        <div
          className={`${styles.flexCenter} absolute lg:left-[10%] -left-4 top-[20%] bg-blue-950 p-3 rounded-full w-28 h-28`}
        >
          <Image className="w-full object-cover" src={nodejs} alt="NodeJs image Svg" />
        </div>
        <div
          className={`${styles.flexCenter} absolute lg:right-[10%] -right-5 bottom-[20%] bg-blue-950 p-3 rounded-full w-24 h-24`}
        >
          <Image className="w-full" src={reactImg} alt="React image Svg" />
        </div>
        <div className="absolute lg:left-[15%] -left-4 bottom-0 bg-blue-950 p-4 rounded-full w-20 h-20">
          <Image className="w-full" src={tsImg} alt="Typescript image Svg" />
        </div>
      </div>
    </div>
  );
};

export default Head;
