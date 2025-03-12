"use client";

import Delete from "@/components/delete/Delete";
import { formatTimestamp, usePostStore , useLoadPosts } from "@/components/lib/store";
import { useRouter } from "next/navigation";

export default function Home() {

  useLoadPosts();

  const router = useRouter()

  const handleNavigation = (postId: number) => {
    console.log(postId)
    router.push(`/okuma/${postId}`);
  };


  const posts = usePostStore((state) => state.posts);
  return (
    <div className="max-w-xl transform translate-x-[120px] p-4 ]">
      <div className="space-y-4 ">
        {posts.map((post, index) => (
         <div className="group flex items-center hover:bg-[#d3d3d3] hover:rounded-xl" key={index}>
          <div 
          onClick={() => handleNavigation(post.id)} 
            className="p-4 "
          >
            <div className="flex flex-wrap items-center justify-between gap-6 ">
              <div>
               <h2 className="text-2xl font-semibold max-h-[100px] overflow-hidden text-ellipsis">{post.title}</h2>
               <p>{post.content}</p>
               <p className="text-gray-500 text-sm">{formatTimestamp(post.timestamp)}</p>
              </div>
              <div className="w-[225px] min-w-[225px] ">
                 <img src={post.imageUrl} className="w-full h-auto object-cover"  />  
              </div>           
            </div>
          </div>
          <div className=" h-9 opacity-0 group-hover:opacity-100 text-right " >
               <Delete postId={post.id} />
            </div>
         </div>
        ))}
      </div>
    </div>
  );
}
