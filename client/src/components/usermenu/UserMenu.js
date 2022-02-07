import React, { useEffect, useState } from "react";
import "./usermenu.css";

import { motion, AnimatePresence } from "framer-motion";

const UserMenu = ({ user, setActive, active }) => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const logoutUser = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
    setActive(false);
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
      <div className="user-data" onClick={() => setIsMenuActive(!isMenuActive)}>
        <img
          src={user.photos[0].value}
          alt="user"
          className={isMenuActive ? "avatar active" : "avatar"}
        />
        {active && (
          <span className="user-name">{user.displayName}</span>
        )}
      </div>
      <AnimatePresence>
        {isMenuActive && (
          <motion.ul
            initial={{ y: "-50%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-50%", opacity: 0 }}
            transition={{ type: "spring", ease: "easeInOut", stiffness: "100", duration: 0.75 }}
            className="user-menu"
          >
            <li className="list-item user-menu-item" onClick={() => setActive(false)}>{user.displayName}</li>
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
