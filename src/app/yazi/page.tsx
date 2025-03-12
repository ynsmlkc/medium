

"use client"

import { useState } from "react";
import Cloud from "@/components/cloud/page";
import { usePostStore } from "../../components/lib/store";
import { handlePublish } from "@/components/Navbar/Publish";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Yazi() {
  const router = useRouter();
  const imageUrl = usePostStore((state) => state.imageUrl)
  const title = usePostStore((state) => state.title);
  const content = usePostStore((state) => state.content);
  const setImageUrl = usePostStore((state)=> state.setImageUrl);
  const setTitle = usePostStore((state) => state.setTitle);
  const setContent = usePostStore((state) => state.setContent);
  const [isPublished, setIsPublished] = useState(false); //  Yayınlanıp yayınlanmadığını takip eden state

  /* Title */

  useEffect(() => {
    if (!isPublished) {  //  Eğer yayınlanmadıysa, önceki başlığı getir
      const storedTitle = localStorage.getItem("savedTitle");
      if (storedTitle) {
        setTitle(storedTitle);
      }
    }
  }, [isPublished]);

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
  }, [isPublished]);

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
  }, [isPublished]);

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isPublished) return;  //  Eğer yayınlandıysa değişiklik yapma
    const newImageUrl = e.target.value;
    setImageUrl(newImageUrl);
    localStorage.setItem("savedImageUrl", newImageUrl);
  };

  /*  Publish İşlemi */
  const handlePublishClick = () => {
    if (title.trim() && content.trim()) {
      handlePublish(router);  //  Yayınlama işlemini çağır
      setIsPublished(true);  // Yayınlandığını işaretle
      setTitle("");  // Title sıfırla
      setContent("");  //  Content sıfırla
      setImageUrl("");
      localStorage.removeItem("savedTitle");  //  LocalStorage'dan da temizle
      localStorage.removeItem("savedContent");
      localStorage.removeItem("savedImageUrl")
    } else {
      // Eğer content boşsa, sadece title'ı sıfırlamadan bırak
      if (!content.trim()) {
        setContent("");  // content'i sıfırla
        localStorage.removeItem("savedContent");
      }
    }
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
