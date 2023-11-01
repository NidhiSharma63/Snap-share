import { multiFormatDateString } from "@/lib/utils";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
type PostCardProps = {
  post: Models.Document;
};
export default function PostCard({ post }: PostCardProps) {
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
      </div>
    </div>
  );
}
