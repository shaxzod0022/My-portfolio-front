import Btn from "@/components/helper/Btn";
import { styles } from "@/styles/styles";
import React from "react";

const AboutHead = () => {
  return (
    <div className={`bg-white p-4 rounded ${styles.flexBetween} gap-4`}>
      <h2 className={`${styles.h2}`}>About</h2>
      <div className={`${styles.flex} flex-wrap gap-4`}>
        <Btn title="hello"/>
      </div>
    </div>
  );
};

export default AboutHead;
