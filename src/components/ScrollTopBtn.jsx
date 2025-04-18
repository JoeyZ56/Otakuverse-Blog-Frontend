import React from "react";
import { motion } from "framer-motion";

const ScrollTopBtn = () => {
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.scrollContainer}>
      <motion.button
        whileInView={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.5, type: "tween" }}
        onClick={handleScroll}
        className={styles.scrollBtn}
        id="scrollBtn"
      >
        <span className="fas fa-arrow-up">Scroll to Top</span>
      </motion.button>
    </div>
  );
};

export default ScrollTopBtn;
