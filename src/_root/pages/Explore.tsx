import { Input } from "@/components/ui/input";
import GridPostList from "@/components/ui/shared/GridPostList";
import Loader from "@/components/ui/shared/Loader";
import SearchResult from "@/components/ui/shared/SearchResult";
import useDebounce from "@/hooks/useDebounce";
import { useGetPosts, useSearchPost } from "@/lib/react-query/queryAndMutations";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Explore() {
  const { ref, inView } = useInView();
  const [search, setSearch] = useState("");
  const debounceValue = useDebounce(search, 500);
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  const { data: searchedPost, isFetching: isSearchFetching } = useSearchPost(debounceValue);
  const shouldShowSearchResults = search !== "";
  const shouldShowPosts = !shouldShowSearchResults && posts?.pages.every((item) => item.documents.length === 0);
  console.log({ posts });

  useEffect(() => {
    if (inView && !search) {
      fetchNextPage();
    }
  }, [inView, search]);

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
          <SearchResult isSearchFetching={isSearchFetching} searchedPosts={searchedPost} />
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ) : (
          posts?.pages.map((item, index) => <GridPostList key={`page-${index}`} posts={item.documents} />)
        )}
      </div>
      {hasNextPage && !search && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
}
