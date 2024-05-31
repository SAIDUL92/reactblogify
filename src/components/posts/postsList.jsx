import PostsCard from "./PostsCard";

export default function PostsList({ posts }) {
  posts.length > 0 ? (
    posts.map((post) => <PostsCard key={post.id} post={post} />)
  ) : (
    <p>No post found</p>
  );
}
