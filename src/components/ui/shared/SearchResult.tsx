import GridPostList from "@/components/ui/shared/GridPostList";
import Loader from "@/components/ui/shared/Loader";

type SearchResultProps = {
  isSearchFetching: boolean;
  searchedPosts: any;
};

export default function SearchResult({ isSearchFetching, searchedPosts }: SearchResultProps) {
  if (isSearchFetching) return <Loader />;
  if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  }
  return <p className="text-light-4 mt-10 text-center w-full">No results found</p>;
}
