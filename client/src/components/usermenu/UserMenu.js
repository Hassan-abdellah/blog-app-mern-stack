import React, { useEffect, useState } from "react";
import "./usermenu.css";

import { motion, AnimatePresence } from "framer-motion";

const UserMenu = ({ user }) => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const logoutUser = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };

  useEffect(() => {
    const getClickOutside = (e) => {
      if (isMenuActive && !e.target.classList.contains(".user-menu")) {
        setIsMenuActive(false);
      }
    };
    document.addEventListener("click", getClickOutside);
    return () => {
      document.removeEventListener("click", getClickOutside);
    };
  }, [isMenuActive]);

  return (
      <li className="list-item user-image">
        <img
          src={user.photos[0].value}
          alt="user"
          className={isMenuActive ? "avatar active" : "avatar"}
          onClick={() => setIsMenuActive(!isMenuActive)}
        />
        <AnimatePresence>
          {isMenuActive && (
            <motion.ul
              initial={{ x: "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-50%", opacity: 0 }}
              transition={{ ease: "easeInOut", duration: 0.75 }}
              className="user-menu"
            >
              <li className="list-item user-menu-item">{user.displayName}</li>
              <li className="list-item user-menu-item" onClick={logoutUser}>
                Logout
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </li>
  );
};

export default UserMenu;
