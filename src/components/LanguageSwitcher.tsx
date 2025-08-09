"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback, memo } from "react";
import { styles } from "@/styles/styles";
import { ChevronsUpDown } from "lucide-react";

const languageOptions = [
  { value: "uz", label: "O‘zbek", icons: "uz" },
  { value: "ru", label: "Русский", icons: "ru" },
  { value: "en", label: "English", icons: "us" },
];

const LanguageSwitcher = memo(function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const currentLocale =
    languageOptions.find((lang) => pathname.startsWith(`/${lang.value}`))
      ?.value || "en";

  const currentLangIcon =
    languageOptions.find((lang) => lang.value === currentLocale)?.icons || "us";

  const handleLanguageChange = useCallback(
    (newLocale: string) => {
      setIsOpen(false);

      const segments = pathname.split("/").filter(Boolean);
      segments[0] = newLocale;
      const newPath = "/" + segments.join("/");

      const queryString = searchParams.toString();
      const fullPath = queryString ? `${newPath}?${queryString}` : newPath;

      router.replace(fullPath);
    },
    [pathname, searchParams, router]
  );

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`${styles.flexBetween} transition-all duration-200 gap-1 p-2 rounded-sm hover:bg-gray-200 cursor-pointer`}
        aria-label="Change language"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className={`fi fi-${currentLangIcon} text-2xl`}></span>
        <ChevronsUpDown />
      </button>

      {isOpen && (
        <ul
          className="absolute lg:left-1/2 left-0 p-3 -translate-x-1/2 mt-2 w-36 bg-white rounded-md shadow-lg z-10 animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          {languageOptions.map((lang) => (
            <li key={lang.value}>
              <button
                onClick={() => handleLanguageChange(lang.value)}
                className={`w-full ${
                  styles.flexStart
                } cursor-pointer text-left px-3 py-2 rounded-md text-sm font-semibold hover:bg-gray-100 transition duration-200 gap-3 ${
                  currentLocale === lang.value ? "bg-blue-50 text-blue-600" : ""
                }`}
              >
                <span className={`fi fi-${lang.icons}`}></span>
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default LanguageSwitcher;
