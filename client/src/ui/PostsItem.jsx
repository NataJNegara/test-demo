export default function PostsItem({ post, children }) {
  return (
    <div className="mb-9 shadow-sm w-full">
      <div className="bg-gray-50 rounded-lg p-9 flex items-start justify-between">
        <div>
          <h2 className="text-4xl mb-4 font-semibold text-indigo-500 first-letter:uppercase">
            {post.title}
          </h2>
          <p className="text-gray-400 text-xs font-semibold mb-9">
            {new Date(post.createdAt).toISOString().split("T")[0]}
          </p>
          <p className="first-letter:uppercase">{post.body}</p>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
