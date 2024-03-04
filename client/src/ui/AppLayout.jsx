import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function AppLayout() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  function handleLogout() {
    if (confirm("Are sure want to logout?")) {
      setUser({ email: null, post: [] });
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    }
  }

  return (
    <>
      <header className="px-8 py-4 bg-blue-500 text-white">
        <nav className="flex justify-between max-w-screen-lg mx-auto">
          <NavLink
            title="homepage"
            to={"/"}
            className="fa-solid fa-house nav-link"></NavLink>

          <div className="flex gap-8">
            {user.email ? (
              <div className="flex items-center gap-4">
                <NavLink
                  title="Create Post"
                  to={"/create"}
                  className="fa-solid fa-circle-plus nav-link"></NavLink>
                <NavLink
                  title="dashboard"
                  to={"/dashboard"}
                  className="fa-solid fa-house-user nav-link"></NavLink>
                <button onClick={handleLogout} title="logout">
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </button>
              </div>
            ) : (
              <>
                <NavLink
                  title="signup"
                  to={"/signup"}
                  className="fa-solid fa-user-plus nav-link"></NavLink>
                <NavLink
                  title="login"
                  to={"/login"}
                  className="fa-solid fa-arrow-right-to-bracket nav-link"></NavLink>
              </>
            )}
          </div>
        </nav>
      </header>

      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
}
