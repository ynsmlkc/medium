import { TiDelete } from "react-icons/ti";
import { usePostStore } from "@/components/lib/store";

interface DeleteProps {
  postId: number;
}

const Delete: React.FC<DeleteProps> = ({ postId }) => {
  const deletePost = usePostStore((state) => state.deletePost);

  return (
    <button 
      onClick={() => deletePost(postId)}
    >
      <TiDelete size={24} />
    </button>
  );
};

export default Delete;
