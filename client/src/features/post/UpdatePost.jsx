import { useState } from "react";
import { updatePost } from "../../services/apiPosts";
import { useLocation, useNavigate } from "react-router-dom";
import Error from "../../ui/Error";

export default function UpdatePost() {
  const { state } = useLocation();
  const [formState, setFormState] = useState({
    title: state.title,
    body: state.body,
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleUpdate(e) {
    e.preventDefault();
    setError("");
    try {
      await updatePost(state._id, formState.title, formState.body);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <section className="card">
      <h1 className="title">Update post</h1>
      <form className="form" onSubmit={handleUpdate}>
        <div className="input-row">
          <label htmlFor="title">Post title</label>
          <input
            autoFocus
            type="text"
            id="title"
            placeholder="Post titile..."
            className="input"
            value={formState.title}
            onChange={(e) =>
              setFormState({ ...formState, title: e.target.value })
            }
          />
        </div>
        <div className="input-row">
          <label htmlFor="body">Post content</label>
          <textarea
            id="body"
            className="input"
            rows={6}
            placeholder="Content..."
            value={formState.body}
            onChange={(e) =>
              setFormState({ ...formState, body: e.target.value })
            }
          />
        </div>
        <button className="primary-btn">Save</button>
      </form>
      {error && <Error message={error} />}
    </section>
  );
}
