import { useEffect, useState } from "react";
import { getPosts } from "../services/apiPosts";
import { usePosts } from "../context/PostsContext";
import PostsItem from "../ui/PostsItem";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const { posts, setPosts } = usePosts();

  useEffect(() => {
    async function allPost() {
      try {
        setIsLoading(true);
        const data = await getPosts();
        setPosts(data.post);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    allPost();
  }, [setPosts]);

  return (
    <section className="p-4 card">
      {isLoading && (
        <i className="fa-solid fa-spinner animate-spin text-4xl"></i>
      )}
      {!isLoading &&
        posts &&
        posts.map((post) => <PostsItem key={post._id} post={post}></PostsItem>)}
    </section>
  );
}
