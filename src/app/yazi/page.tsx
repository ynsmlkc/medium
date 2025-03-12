

"use client"

import { useState } from "react";
import Cloud from "@/components/cloud/page";
import { usePostStore } from "../../components/lib/store";


import { useEffect } from "react";

export default function Yazi() {
  
  
  const title = usePostStore((state) => state.title);
  const content = usePostStore((state) => state.content);
  const setImageUrl = usePostStore((state)=> state.setImageUrl);
  const setTitle = usePostStore((state) => state.setTitle);
  const setContent = usePostStore((state) => state.setContent);
  const [isPublished] = useState(false); //  Yayınlanıp yayınlanmadığını takip eden state

  /* Title */

  useEffect(() => {
    if (!isPublished) {  //  Eğer yayınlanmadıysa, önceki başlığı getir
      const storedTitle = localStorage.getItem("savedTitle");
      if (storedTitle) {
        setTitle(storedTitle);
      }
    }
  }, [isPublished, setTitle]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isPublished) return;  //  Eğer yayınlandıysa değişiklik yapma
    const newTitle = e.target.value;
    setTitle(newTitle);
    localStorage.setItem("savedTitle", newTitle);
  };

  

  /* Content */

  useEffect(() => {
    if (!isPublished) {  //  Eğer yayınlanmadıysa, önceki içeriği getir
      const storedContent = localStorage.getItem("savedContent");
      if (storedContent) {
        setContent(storedContent);
      }
    }
  }, [isPublished, setContent]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isPublished) return;  // ✅ Eğer yayınlandıysa değişiklik yapma
    const newContent = e.target.value;
    setContent(newContent);
    localStorage.setItem("savedContent", newContent);
  };
  
  /* Image Url */

  useEffect(() => {
    if (!isPublished) {  //  Eğer yayınlanmadıysa, önceki başlığı getir
      const storedImageUrl = localStorage.getItem("savedImageUrl");
      if (storedImageUrl) {
        setImageUrl(storedImageUrl);
      }
    }
  }, [isPublished, setImageUrl]);

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isPublished) return;  //  Eğer yayınlandıysa değişiklik yapma
    const newImageUrl = e.target.value;
    setImageUrl(newImageUrl);
    localStorage.setItem("savedImageUrl", newImageUrl);
  };

  
  return (
    <div>
      <div className="max-w-2xl mx-auto p-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 mb-4 text-5xl font-bold focus:outline-none"
          value={title}
          onChange={handleTitleChange}
        />
        
        <textarea
          placeholder="Tell your story..."
          className="w-full p-2 mb-4 text-xl h-[320px] focus:outline-none"
          value={content}
          onChange={handleContentChange}
        />
        
      </div>

      <div className="transform translate-x-[405px]" onChange={handleImageUrlChange}>
        <Cloud/>
      </div>
    </div>
  );
}
