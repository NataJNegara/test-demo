import { useEffect, useState } from "react";
import { deletePost, getUserPosts } from "../../services/apiPosts";
import { useUser } from "../../context/UserContext";
import PostsItem from "../../ui/PostsItem";
import { Link } from "react-router-dom";
import Error from "../../ui/Error";
import Success from "../../ui/Success";

export default function UserDashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  // user context
  const { user, setUser } = useUser();

  useEffect(() => {
    async function userPosts() {
      try {
        setIsLoading(true);
        const { email, post } = await getUserPosts();
        setUser({ email, post });
      } catch (error) {
        throw Error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    userPosts();
  }, [setUser]);

  async function handleDelete(_id) {
    setError("");
    setSuccess("");
    if (confirm("This post will be delete permanently?")) {
      try {
        const data = await deletePost(_id);
        setSuccess(data.success);
      } catch (error) {
        setError(error.message);
      }

      const newPost = user.post.filter((post) => post._id !== _id);
      setUser({ ...user, post: newPost });
    }
  }

  return (
    <section className="p-4 card">
      {isLoading && (
        <i className="fa-solid fa-spinner animate-spin text-4xl"></i>
      )}
      {error && <Error message={error} />}
      {success && <Success message={success} />}

      <p className="bg-blue-500 inline-block px-4 py-2 mb-4 text-indigo-50 rounded-md shadow-md">
        {user.email}
      </p>

      {user.post.length === 0 && (
        <p className="text-center bg-white rounded-md text-indigo-500 font-semibold uppercase text-2xl shadow-sm">
          There no post to be show
        </p>
      )}

      {user.post &&
        user.post.map((post) => (
          <PostsItem key={post._id} post={post}>
            <div className="flex gap-2">
              <Link
                to={"/update"}
                state={post}
                className="flex gap-2 items-center bg-yellow-400 text-white py-1 px-2 rounded-md font-semibold">
                <i className="fa-regular fa-pen-to-square"></i>
                <span>Edit</span>
              </Link>
              <button
                className="flex gap-2 items-center bg-red-500 text-white py-1 px-2 rounded-md font-semibold"
                onClick={() => handleDelete(post._id)}>
                <i className="fa-regular fa-trash-can"></i>
                <span>Delete</span>
              </button>
            </div>
          </PostsItem>
        ))}
    </section>
  );
}
