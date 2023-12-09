import { PostCard } from "../PostCard";
import "./styles.css";
export const Posts = ({ posts }) => (
  <div className="posts">
    {posts.map((post) => (
      <PostCard
        key={post.id}
        body={post.body}
        cover={post.cover}
        title={post.title}
      />
    ))}
  </div>
);
