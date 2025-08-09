// app/[locale]/blog/[slug]/page.tsx
import { BlogService } from "@/services/blog.service";
import { BlogType } from "@/interfaces/blog.interface";
import { styles } from "@/styles/styles";

const BlogPage = async ({ params }: { params: { slug: string } }) => {
  let blog: BlogType | null = null;
  try {
    blog = await BlogService.getByIdSlug(params.slug);
    console.log("Blog data:", blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
  }

  return (
    <div className={`${styles.paddingCont} mt-20`}>
      <h1>Blog: {params.slug}</h1>
      {blog ? (
        <div>
          <h2>{blog?.title}</h2>
          <p>{blog?.description}</p>
        </div>
      ) : (
        <p>Blog not found</p>
      )}
    </div>
  );
};

export default BlogPage;
