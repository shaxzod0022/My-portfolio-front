import { Blogs } from "@/components";
import { BlogService } from "@/services/blog.service";
import { styles } from "@/styles/styles";
import React from "react";

const HomePage = async () => {
  const blogs = await BlogService.getAllBlogs();
  return (
    <div
      className={`${styles.paddingCont} flex flex-wrap justify-between gap-2 w-full mt-24`}
    >
      {blogs.map((item, idx) => (
        <Blogs item={item} key={idx} />
      ))}
    </div>
  );
};

export default HomePage;
