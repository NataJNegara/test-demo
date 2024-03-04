import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { UserProvider } from "./context/UserContext";
import UserDashboard from "./features/users/UserDashboard";
import { PostsProvider } from "./context/PostsContext";
import CreatePost from "./features/post/CreatePost";
import UpdatePost from "./features/post/UpdatePost";
import ProtectedRoute from "./ui/ProtectedRoute";
import GuestRoute from "./ui/GuestRoute";

function App() {
  return (
    <PostsProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Home />} />

              <Route element={<ProtectedRoute />}>
                <Route path="dashboard" element={<UserDashboard />} />
                <Route path="create" element={<CreatePost />} />
                <Route path="update" element={<UpdatePost />} />
              </Route>

              <Route element={<GuestRoute />}>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </PostsProvider>
  );
}

export default App;
