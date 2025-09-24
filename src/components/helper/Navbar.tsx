"use client";
import { Logo2 } from "@/assets";
import { styles } from "@/styles/styles";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { AlignRight, Github, Linkedin, Mail } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { NavbarLink } from "@/interfaces/navbar.interface";
import ThemeSwitcher from "./ThemeSwitcher";
import { SocialLink } from "@/interfaces/link.interface";
import { LinkService } from "@/services/link.service";
import { handleError } from "@/lib/handleError";

const Navbar = () => {
  const t = useTranslations("navbar");
  const links = t.raw("navLinks") as NavbarLink[];
  const [modal, setModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const lang = useLocale();
  const [link, setLink] = useState<SocialLink[]>([]);

  const getLink = useCallback(async () => {
    setLoading(true);
    try {
      const response = await LinkService.getAllLinks(lang);
      const githubAndLinkedin = response.filter(
        (item) =>
          item.linkPathname.includes("github") ||
          item.linkPathname.includes("linkedin")
      );
      if (response) setLink(githubAndLinkedin);
    } catch (err) {
      setMessage(handleError(err));
    } finally {
      setLoading(false);
    }
  }, [lang]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  return (
    <div
      className={`${styles.paddingCont} ${styles.flexBetween} bg-white/40 backdrop-blur-md !py-4 fixed top-0 max-w-[1800px] w-full mx-auto`}
    >
      <Link href={"/"} className={`${styles.flex} md:gap-5 gap-2`}>
        <Image
          src={Logo2}
          className="md:w-20 w-10"
          alt="Shakhzod's portfolio Logotip"
        />
        <span className={`${styles.h2} sm:block hidden`}>{t("logo")}</span>
      </Link>

      <div className={`${styles.flex} relative gap-5`}>
        <ThemeSwitcher />
        <LanguageSwitcher />
        <button
          className="xl:hidden flex cursor-pointer"
          onClick={() => setModal((i) => !i)}
        >
          <AlignRight />
        </button>
        <ul
          className={`flex xl:p-0 md:p-7 bg-transparent p-4 xl:h-auto xl:w-auto lg:w-1/4 md:w-1/3 transition-all duration-200 w-2/3 h-svh xl:items-center xl:justify-between xl:flex-row flex-col xl:gap-7 gap-3 xl:static fixed ${
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
          {link.length != 0 &&
            link.map((item) => (
              <li key={item._id} className="group relative">
                <Link
                  className={`${styles.h4} ${styles.flex} gap-2`}
                  href={item.linkPathname}
                >
                  {item.linkPathname.includes("github") ? (
                    <Linkedin className="p-1 rounded bg-blue-950 text-white" />
                  ) : (
                    <Github className="p-1 rounded-full bg-blue-950 text-white" />
                  )}
                  {item.linkName}
                </Link>
                <span
                  className={`absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-950 transition-all duration-200 group-hover:w-full rounded-2xl`}
                ></span>
              </li>
            ))}
          <li>
            <button
              className={`${styles.flex} transition-all duration-100 gap-2 text-white bg-blue-950 hover:bg-blue-900 active:bg-blue-950 font-semibold rounded-lg py-2 px-5`}
            >
              <Mail />
              {t("btn")}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
