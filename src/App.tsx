import { AuthLayout, SignInForm, SignUpForm } from "@/_auth";
import RootLayout from "@/_root/RootLayout";
import { Home } from "@/_root/pages";
import AllUsers from "@/_root/pages/AllUsers";
import CreatePost from "@/_root/pages/CreatePost";
import EditPost from "@/_root/pages/EditPost";
import Explore from "@/_root/pages/Explore";
import PostDetails from "@/_root/pages/PostDetails";
import Profile from "@/_root/pages/Profile";
import Saved from "@/_root/pages/Saved";
import UpdateProfile from "@/_root/pages/UpdateProfile";
import "@/styles/index.css";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/sign-in" element={<SignInForm />} />
        </Route>

        {/* private routes */}
        {/* index true means that it will the starting page  */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id/*" element={<UpdateProfile />} />
        </Route>
      </Routes>
    </main>
  );
}
