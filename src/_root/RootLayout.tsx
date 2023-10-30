import BottomBar from "@/components/ui/shared/BottomBar";
import LeftBar from "@/components/ui/shared/LeftBar";
import TopBar from "@/components/ui/shared/TopBar";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="w-full md:flex">
      <TopBar />
      <LeftBar />
      <section className="flex flex-1 h-full">
        <Outlet />
      </section>
      <BottomBar />
    </div>
  );
}
