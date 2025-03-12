"use client";

import { useParams } from "next/navigation";
import { usePostStore } from "@/components/lib/store";
import { useEffect, useState } from "react";
import { formatTimestamp } from "@/components/lib/store";

export default function PostDetailPage() {
  const params = useParams(); 
  
  const postId = params?.postId; // postId'yi al

  type Post = {
    id: number;
    title: string;
    content: string;
    imageUrl: string;
    timestamp: number;
  };
  
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (postId) {
      const foundPost = usePostStore.getState().posts.find((p) => p.id === Number(postId));
      setPost(foundPost ?? null);
    }
  }, [postId]);

  if (!post) {
    return <div>Öyle bir Post yok ya da o Post silinmiş...</div>;
  }

  return (
    <div className="p-4  ">
      <h1 className="text-3xl font-semibold mb-4 ">{post.title}</h1>
      <p>{post.content}</p>
      <img src={post.imageUrl} alt={post.title} className="w-[440px] h-auto object-cover mt-8" />
      <p className="text-gray-500 text-sm mt-3">{formatTimestamp(post.timestamp)}</p>
    </div>
  );
}
