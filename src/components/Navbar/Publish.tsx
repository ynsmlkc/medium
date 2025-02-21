"use client";
import { useRouter } from "next/navigation";
import { usePostStore } from "../lib/store";

export default function Publish() {
  const router = useRouter();
  const title = usePostStore((state) => state.title);
  const content = usePostStore((state) => state.content);
  const addPost = usePostStore((state) => state.addPost);

  const handlePublish = () => {
    if (title.trim() && content.trim()) {
      addPost();
      router.push("/");
    }
  };

  return (
    <div>
      {title.trim() && content.trim() ? (
        <button
          onClick={handlePublish}
          className="bg-green-600 text-white px-2  rounded-full"
        >
          Publish
        </button>
      ) : (
        <button
          className="bg-green-300 text-white px-2  rounded-full "
          disabled
        >
          Publish
        </button>
      )}
    </div>
  );
}
