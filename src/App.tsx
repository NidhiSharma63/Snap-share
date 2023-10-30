import { AuthLayout, SignInForm, SignUpForm } from "@/_auth";
import RootLayout from "@/_root/RootLayout";
import { Home } from "@/_root/pages";
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
        </Route>
      </Routes>
    </main>
  );
}
