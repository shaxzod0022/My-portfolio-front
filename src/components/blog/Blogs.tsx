"use client";
import { BlogCardProps } from "@/interfaces/blog.interface";
import { BlogService } from "@/services/blog.service";
import { useRouter } from "next/navigation";

const Blogs = ({ item }: BlogCardProps) => {
  const router = useRouter();

  const onDeleteHandler = async () => {
    try {
      const statusResponse = await BlogService.deleteBlog(item._id);
      if (statusResponse === 200) {
        router.refresh();
      }
    } catch (error) {
      const result = error as Error;
      console.log(result.message);
    }
  };

  return (
    <div className="w-1/4 border rounded p-3">
      <h3 className="font-semibold text-2xl">{item.title}</h3>
      <p>{item.description}</p>
      <div className="space-x-2">
        <button
          onClick={() => router.push(`/blog/${item.slug}`)}
          className="py-2 px-4 bg-blue-600 text-white active:bg-blue-800 rounded mt-3 cursor-pointer"
        >
          View
        </button>
        <button className="py-2 px-4 bg-green-600 text-white active:bg-green-800 rounded mt-3 cursor-pointer">
          Edit
        </button>
        <button
          onClick={onDeleteHandler}
          className="py-2 px-4 bg-red-600 text-white active:bg-red-800 rounded mt-3 cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Blogs;
