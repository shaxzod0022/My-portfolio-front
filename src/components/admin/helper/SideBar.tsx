"use client";
import { Logo2 } from "@/assets";
import { styles } from "@/styles/styles";
import { navLinks } from "@/utils/constants";
import {
  AlignLeft,
  Boxes,
  House,
  ListOrdered,
  ScrollText,
  TypeOutline,
  Users,
  Shield,
  User,
  NotepadText,
  Album,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC, useState, useEffect } from "react";

const iconMap: Record<string, React.ElementType> = {
  House,
  ListOrdered,
  Boxes,
  TypeOutline,
  ScrollText,
  Users,
  Shield,
  User,
  Album,
  NotepadText,
};

interface Props {
  hidden: boolean;
  onToggleSidebar?: () => void;
}

const Sidebar: FC<Props> = ({ hidden, onToggleSidebar }) => {
  const pathname = usePathname();

  return (
    <div
      className={`bg-white z-5 fixed top-0 w-2/3 md:w-[20%] 2xl:w-[17%] min-h-screen transition-all duration-150 ${
        hidden ? "md:-left-full left-0" : "md:left-0 -left-full"
      }`}
    >
      <div className={`${styles.flex} gap-3 p-8`}>
        <Image
          className="w-12"
          src={Logo2}
          alt="Shakhzod's portfolio logotip"
        />
        <h1 className={`${styles.h2}`}>Shakhzod</h1>
      </div>
      <button
        onClick={onToggleSidebar}
        className={`cursor-pointer text-start gap-2 ${styles.p} ${styles.flex} bg-red-200 w-full md:hidden px-8 p-2 transition`}
      >
        <AlignLeft className="w-7 h-7" />
        <span>Close Menu</span>
      </button>

      <ul>
        {navLinks.map((link, idx) => {
          const Icon = iconMap[link.icons];
          if (!Icon) return null;
          return (
            <li key={idx}>
              <Link
                href={"/admin" + link.path}
                onClick={() =>
                  hidden ||
                  (typeof window !== "undefined" && window.innerWidth < 768)
                    ? onToggleSidebar?.()
                    : null
                }
                className={`${styles.flex} ${styles.p} ${
                  pathname.includes(link.path) && "!bg-blue-950 !text-white"
                } gap-2 py-3 px-8 transition w-full text-blue-950 hover:bg-blue-950/20 font-semibold`}
              >
                <Icon className="w-7 h-7" />
                <span>{link.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
