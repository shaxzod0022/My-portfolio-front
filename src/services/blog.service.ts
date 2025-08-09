import { BlogType } from "@/interfaces/blog.interface";
import axios from "axios";

export const BlogService = {
  async getAllBlogs() {
    const { data } = await axios.get<BlogType[]>(
      `${process.env.NEXT_PUBLIC_DOMAIN_API}/blog`
    );
    return data;
  },
  async getByIdSlug(slug: string) {
    const { data } = await axios.get<BlogType>(
      `${process.env.NEXT_PUBLIC_DOMAIN_API}/blog/${slug}`
    );
    return data;
  },
  async deleteBlog(id: string) {
    const { status } = await axios.delete<number>(
      `${process.env.NEXT_PUBLIC_DOMAIN_API}/blog/${id}`,
      { data: id }
    );
    return status;
  },
  async createBlog() {},
};
