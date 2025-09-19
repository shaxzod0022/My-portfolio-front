import { AboutMe, Blogs, Head } from "@/components";
import { BlogService } from "@/services/blog.service";
import { styles } from "@/styles/styles";
import React from "react";

const HomePage = async () => {
  const blogs = await BlogService.getAllBlogs();
  return (
    <div className={`${styles.paddingCont} mt-12`}>
      <Head />
      <AboutMe />
    </div>
  );
};

export default HomePage;
