import { useState } from "react";
import Error from "../ui/Error";
import { signUp } from "../services/apiAuth";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState();

  const navigate = useNavigate();
  const { setUser } = useUser();

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    try {
      // register
      await signUp(formData.email, formData.password, formData.passwordConfirm);
      // set user state (context)
      setUser({ email: formData.email, post: [] });
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <section className="card">
      <h1 className="title">Sign up Form</h1>
      <form className="form" onSubmit={handleRegister}>
        <div className="input-row">
          <label htmlFor="email">Email</label>
          <input
            autoFocus
            type="text"
            id="email"
            className="input"
            placeholder="example@email.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="input-row">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="input"
            placeholder="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <div className="input-row">
          <label htmlFor="password2">Repeat password</label>
          <input
            type="password"
            id="password2"
            className="input"
            placeholder="confirm password"
            value={formData.passwordConfirm}
            onChange={(e) =>
              setFormData({ ...formData, passwordConfirm: e.target.value })
            }
          />
        </div>
        <button className="primary-btn">Sign up</button>
      </form>
      {error && <Error message={error} />}
    </section>
  );
}
