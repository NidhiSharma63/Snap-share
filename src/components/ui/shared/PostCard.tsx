import PostStats from "@/components/ui/shared/PostStats";
import { useAuthContext } from "@/context/AuthContext";
import { multiFormatDateString } from "@/lib/utils";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
type PostCardProps = {
  post: Models.Document;
};
export default function PostCard({ post }: PostCardProps) {
  const { user } = useAuthContext();

  if (!post.creator) return;

  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              className="rounded-full w-12 lg:h-12"
              alt="creator"
              src={post?.creator?.imageUrl || "/assets/icons/profile-placholder.svg"}
            />
          </Link>
          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">{post.creator.name}</p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-reguler">{multiFormatDateString(post.$createdAt)}</p>-
              <p className="subtle-semibold lg:small-reguler">{post.location}</p>
            </div>
          </div>
        </div>
        <Link to={`/update-post/${post.$id}`} className={`${user.id !== post.creator.$id && "hidden"} `}>
          <img src="/assets/icons/edit.svg" width={20} height={20} alt="edit" />
        </Link>
      </div>
      <Link to={`/posts/${post.$id}`}>
        <div className="small-medium lg:base-meduim py-5">
          <p>{post.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post?.tags?.map((tag: string) => {
              return (
                <li key={tag} className="text-light-3">
                  #{tag}
                </li>
              );
            })}
          </ul>
        </div>
        <img className="post-card_img" alt="post image" src={post.imageUrl || "/assets/icons/profile-placholder.svg"} />
      </Link>
      <PostStats post={post} userId={user.id} />
    </div>
  );
}
