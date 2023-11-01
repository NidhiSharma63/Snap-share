import Loader from "@/components/ui/shared/Loader";

export default function Home() {
  const l = true;
  const posts = null;
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {l && !posts ? <Loader /> : <ul></ul>}
        </div>
      </div>
    </div>
  );
}
