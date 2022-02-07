import React, { useState } from "react";
import "./navmenu.css";
import { motion, AnimatePresence } from "framer-motion";
import Carret from "./carret.svg";
import { categories } from "../../data";
import { NavLink } from "react-router-dom";
const NavMenu = ({active,setActive}) => {
  const [isSubMenu, setIsSubMenu] = useState(false);
  return (
    <li className="list-item nav-menu">
      <span
        onMouseEnter={() => setIsSubMenu(true)}
        onMouseLeave={() => setIsSubMenu(false)}
        onClick={() => active && setIsSubMenu(!isSubMenu)}
      >
        Categories
        <img
          src={Carret}
          alt="carret"
          className={isSubMenu ? active ? "carret active small" : "carret active"  : "carret"}
        />
      </span>
      <AnimatePresence>
        {isSubMenu && (
          <motion.ul
            initial={{ y: "-1%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-1%", opacity: 0 }}
            transition={{ type:"spring",stiffness: "100" , ease: "easeInOut", duration: 0.75 }}
            className={active ? "nav-submenu small" : "nav-submenu"}
            onMouseEnter={() => setIsSubMenu(true)}
            onMouseLeave={() => setIsSubMenu(false)}
          >
            {categories.map((cat) => (
              <li key={cat.id} className="submenu-item" onClick={() => setIsSubMenu(false)}>
                <NavLink to={`/posts/cats/${cat.name}`} onClick={() => setActive(false)}>
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
