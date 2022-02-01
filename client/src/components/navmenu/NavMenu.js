import React, { useState } from "react";
import "./navmenu.css";
import { motion, AnimatePresence } from "framer-motion";
import Carret from "./carret.svg";
import { categories } from "../../data";
import { NavLink } from "react-router-dom";
const NavMenu = () => {
  const [isSubMenu, setIsSubMenu] = useState(false);
  return (
    <li className="list-item nav-menu">
      <span
        onMouseEnter={() => setIsSubMenu(true)}
        onMouseLeave={() => setIsSubMenu(false)}
      >
        Categories
        <img
          src={Carret}
          alt="carret"
          className={isSubMenu ? "carret active" : "carret"}
        />
      </span>
      <AnimatePresence>
        {isSubMenu && (
          <motion.ul
            initial={{ x: "-50%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-50%", opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.75 }}
            className="nav-submenu"
            onMouseEnter={() => setIsSubMenu(true)}
            onMouseLeave={() => setIsSubMenu(false)}
          >
            {categories.map((cat) => (
              <li key={cat.id} className="submenu-item" onClick={() => setIsSubMenu(false)}>
                <NavLink to={`/posts/cats/${cat.name}`}>
                  {cat.name.slice(0, 1).toUpperCase() + cat.name.slice(1)}
                </NavLink>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
};

export default NavMenu;
