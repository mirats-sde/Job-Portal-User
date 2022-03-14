import React from "react";
import styles from "./loading.module.css";
function LoadingScreen() {
  return (
    <div className={styles.loading_container}>
      <div className={styles.gooey}>
        <span className={styles.dot}></span>
        <div className={styles.dots}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
