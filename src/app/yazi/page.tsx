"use client";

import { usePostStore } from "../../components/lib/store";

export default function Yazi() {
  const title = usePostStore((state) => state.title);
  const content = usePostStore((state) => state.content);
  const setTitle = usePostStore((state) => state.setTitle);
  const setContent = usePostStore((state) => state.setContent);
  
  return (
    <div className="max-w-2xl mx-auto p-4">
      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 mb-4 text-5xl font-bold focus:outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      
      <textarea
        placeholder="Tell your story..."
        className="w-full p-2 mb-4 text-xl h-40 focus:outline-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
}
