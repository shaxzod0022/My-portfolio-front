"use client";
import Btn from "@/components/helper/Btn";
import { styles } from "@/styles/styles";
import React, { useState } from "react";
import AuthorCreate from "./AuthorCreate";

const AboutHead = () => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <div className={`bg-white p-4 rounded ${styles.flexBetween} gap-4`}>
      <h2 className={`${styles.h2}`}>About</h2>
      <div className={`${styles.flex} flex-wrap gap-4`}>
        <AuthorCreate
          hidden={show}
          show={() => setShow(false)}
          onSuccess={() => {}}
        />
        <div
          onClick={() => setShow(false)}
          className={`fixed top-0 left-0 ${
            show ? "bg-black/40 w-screen h-screen z-40 backdrop-blur-sm" : ""
          }`}
        />
        <Btn onClick={() => setShow(true)} title="Author Create" />
        <Btn title="Author" />
      </div>
    </div>
  );
};

export default AboutHead;
