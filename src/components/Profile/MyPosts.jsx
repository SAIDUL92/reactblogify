import { useProfile } from "../../hooks/useProfile";
import PostsCard from "../posts/PostsCard";

export default function MyPosts() {
  const { state } = useProfile();
  const posts = state?.posts;

  return (
    <>
      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4>
      <div className="my-6 space-y-4">
        {posts.map((post) => (
          <PostsCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
