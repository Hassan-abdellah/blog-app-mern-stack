import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./dropdown.css";
import Carret from "./carret.svg";
const Dropdown = ({ carret, label, className, options,selected,setSelected }) => {
  const [isActive, setIsActive] = useState(false);
  // const [selected, setSelected] = useState("");
  useEffect(() => {
    const getClickOutside = (e) => {
      if (isActive && !e.target.classList.contains(".dropdown-content")) {
        setIsActive(false);
      }
    };
    document.addEventListener("click", getClickOutside);
    return () => {
      document.removeEventListener("click", getClickOutside);
    };
  }, [isActive]);
  return (
    <div className={className ? `dropdown ${className}` : "dropdown"}>
      <button
        className={isActive ? "dropdown-btn active" : "dropdown-btn"}
        onClick={() => setIsActive(!isActive)}
        type="button"
      >
        {selected ? selected : `-- ${label} --`}
        {carret && (
          <img
            src={Carret}
            className={isActive ? "carret flip" : "carret"}
            alt="arrow"
          />
        )}
      </button>
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.75 }}
            className="dropdown-content"
          >
            {options.map((option, index) => (
              <div
                className="dropdown-item"
                key={index}
                onClick={(e) => {
                  setTimeout(() => {
                    setSelected(e.target.textContent);
                    // setSelected(option.name);
                  }, 750);
                  setIsActive(false);
                }}
              >
                {option.name.slice(0, 1).toUpperCase() + option.name.slice(1)}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
