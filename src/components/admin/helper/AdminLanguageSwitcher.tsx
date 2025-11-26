"use client";
import { useState, useCallback, memo, useEffect, useRef } from "react";
import { styles } from "@/styles/styles";
import { ChevronsUpDown } from "lucide-react";
import "flag-icons/css/flag-icons.min.css"; // <-- Flag icons ishlashi uchun
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setLanguage } from "@/store/languageSlice";

const languageOptions = [
  { value: "uz", label: "O‘zbek", icons: "uz" },
  { value: "ru", label: "Русский", icons: "ru" },
  { value: "en", label: "English", icons: "us" },
];

interface Props {
  newClass?: string;
}

const AdminLanguageScitcher = memo(function AdminLanguageScitcher({
  newClass,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLUListElement | null>(null);
  const dispatch = useDispatch();
  const lang = useSelector((state: RootState) => state.language.lang);

  const currentLocale = lang || "en";
  const currentLangIcon =
    languageOptions.find((l) => l.value === currentLocale)?.icons || "us";

  const handleLanguageChange = useCallback(
    (newLocale: string) => {
      setIsOpen(false);
      dispatch(setLanguage(newLocale)); // <-- faqat store orqali o‘zgartiramiz
      localStorage.setItem("lang", newLocale); // optional: localStorage ga yozib qo‘yish
    },
    [dispatch]
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`${newClass ? newClass : "inline-block"} relative `}>
      <button
        type="button"
        onClick={() => setIsOpen((i) => !i)}
        className={`${styles.flexBetween} transition-all duration-200 gap-1 p-2 rounded-sm hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer`}
        aria-label="Change language"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className={`fi fi-${currentLangIcon} text-2xl`}></span>
        <ChevronsUpDown className="text-gray-700 dark:text-gray-300" />
      </button>

      {isOpen && (
        <ul
          ref={modalRef}
          className="absolute lg:left-1/2 left-0 p-3 lg:-translate-x-1/2 mt-2 w-36 
                     bg-white dark:bg-gray-800 
                     rounded-md shadow-lg z-10 animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          {languageOptions.map((l) => (
            <li key={l.value}>
              <button
                onClick={() => handleLanguageChange(l.value)}
                className={`w-full ${
                  styles.flexStart
                } cursor-pointer text-left px-3 py-2 rounded-md text-sm font-semibold 
                  hover:bg-gray-100 dark:hover:bg-gray-700 
                  transition duration-200 gap-3
                  ${
                    currentLocale === l.value
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                      : "text-gray-700 dark:text-gray-200"
                  }`}
              >
                <span className={`fi fi-${l.icons}`}></span>
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default AdminLanguageScitcher;
