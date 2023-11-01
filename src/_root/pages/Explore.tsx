import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/shared/Loader";
import { useSearchPost } from "@/lib/react-query/queryAndMutations";
import { useState } from "react";

export default function Explore() {
  const posts = [];
  const [search, setSearch] = useState("");
  const { data: searchedPost, isFetching: isSearchFetching } = useSearchPost(search);

  const shouldShowSearchResults = search !== "";
  const shouldShowPosts = !shouldShowSearchResults && posts?.pages.every((item) => item.documents.length === 0);

  if (!posts)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <div className="explore-container">
      <div className="explore-inner_conatiner">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img src="/assets/icons/search.svg" height={24} width={24} alt="explore" />
          <Input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}></Input>
        </div>
      </div>
      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h2 className="body-bold md:h3-bold">Popular Today</h2>
        <div className="flex-center gap-3 bg-dark rounded-xl px-4">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <img src="/assets/icons/filter.svg" width={20} height={20} alt="filter" />
        </div>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResults ? (
          <shouldShowSearchResults isSearchFetching={isSearchFetching} searchedPosts={searchedPosts} />
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ) : (
          posts.pages.map((item, index) => <GridPostListdPostList key={`page-${index}`} posts={item.documents} />)
        )}
      </div>
    </div>
  );
}
