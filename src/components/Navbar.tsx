"use client";
import { Logo2 } from "@/assets";
import { styles } from "@/styles/styles";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AlignRight, Github, Linkedin, Mail } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { NavbarLink } from "@/interfaces/navbar.interface";

const Navbar = () => {
  const t = useTranslations("navbar");
  const links = t.raw("navLinks") as NavbarLink[];
  const [modal, setModal] = useState<boolean>(false);

  return (
    <div
      className={`${styles.paddingCont} ${styles.flexBetween} !py-4 fixed top-0 max-w-[1800px] w-full mx-auto`}
    >
      <Link href={"/"} className={`${styles.flex} md:gap-5 gap-2`}>
        <Image src={Logo2} className="md:w-20 w-10" alt="" />
        <span className={`${styles.h2} sm:block hidden`}>{t("logo")}</span>
      </Link>

      <div className={`${styles.flex} relative gap-5`}>
        <LanguageSwitcher />
        <button
          className="xl:hidden flex cursor-pointer"
          onClick={() => setModal((i) => !i)}
        >
          <AlignRight />
        </button>
        <ul
          className={`flex xl:p-0 md:p-7 p-4 xl:h-auto xl:w-auto lg:w-1/4 md:w-1/3 transition-all duration-200 w-2/3 h-svh xl:items-center bg-white xl:justify-between xl:flex-row flex-col xl:gap-7 gap-3 xl:static fixed ${
            modal ? "right-0 top-20" : "top-0 -right-[100%]"
          }`}
        >
          {links.map((item, idx) => (
            <li key={idx} className="group relative">
              <Link className={`${styles.h4}`} href={`#${item.path}`}>
                {item.label}
              </Link>
              <span
                className={`absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-950 transition-all duration-200 group-hover:w-full rounded-2xl`}
              ></span>
            </li>
          ))}
          <li className="group relative">
            <Link className={`${styles.h4} ${styles.flex} gap-2`} href={``}>
              <Linkedin className="p-0.5 rounded bg-blue-950 text-white" />
              Linkedin
            </Link>
            <span
              className={`absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-950 transition-all duration-200 group-hover:w-full rounded-2xl`}
            ></span>
          </li>
          <li className="group relative">
            <Link className={`${styles.h4} ${styles.flex} gap-2`} href={``}>
              <Github className="p-0.5 rounded-full bg-blue-950 text-white" />
              GitHub
            </Link>
            <span
              className={`absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-950 transition-all duration-200 group-hover:w-full rounded-2xl`}
            ></span>
          </li>
          <li>
            <button
              className={`${styles.flex} transition-all duration-50 gap-2 hover:bg-blue-900 active:bg-blue-800 cursor-pointer font-semibold bg-blue-950 text-white rounded-lg py-2 px-7`}
            >
              <Mail />
              Menga yozing
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
