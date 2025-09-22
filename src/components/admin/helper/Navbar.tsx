"use client";
import { styles } from "@/styles/styles";
import { AlignLeft, ChevronDown, LogOut, Shield, User } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { getCurrentUsername, getCurrentUserRole, logout } from "@/utils/auth";

interface Props {
  onToggleSidebar: () => void;
}

const Navbar = ({ onToggleSidebar }: Props) => {
  const [username, setUsername] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUsername(getCurrentUsername());
    setUserRole(getCurrentUserRole());
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={`${styles.flexBetween} sticky top-0 w-full bg-white p-5`}>
      <button
        onClick={onToggleSidebar}
        className={`cursor-pointer p-2 rounded-xl hover:bg-gray-100 transition`}
      >
        <AlignLeft />
      </button>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className={`${styles.flex} items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors`}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-950 flex items-center justify-center">
              {userRole === "super_admin" ? (
                <Shield className="w-4 h-4 text-white" />
              ) : (
                <User className="w-4 h-4 text-white" />
              )}
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-gray-900">
                {username || "Admin"}
              </div>
              <div className="text-xs text-gray-500">User</div>
            </div>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform ${
              showUserMenu ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {showUserMenu && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            <div className="px-4 py-2 border-b border-gray-100">
              <div className="text-sm font-medium text-gray-900">
                {username || "Admin"}
              </div>
              <div className="text-xs text-gray-500">by</div>
            </div>

            <div className="px-4 py-2">
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full`}
              >
                Active
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
