import { useState } from "react";
import Error from "../ui/Error";
import { login } from "../services/apiAuth";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const navigate = useNavigate();
  const { setUser } = useUser();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      // set user state (context)
      setUser({ email, post: [] });
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <section className="card">
      <h1 className="title">Login Form</h1>
      <form className="form" onSubmit={handleLogin}>
        <div className="input-row">
          <label htmlFor="email">Email</label>
          <input
            autoFocus
            type="text"
            id="email"
            className="input"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-row">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="input"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="primary-btn">Login</button>
      </form>
      {error && <Error message={error} />}
    </section>
  );
}
