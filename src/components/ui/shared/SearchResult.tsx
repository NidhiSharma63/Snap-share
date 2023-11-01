import GridPostList from "@/components/ui/shared/GridPostList";
import Loader from "@/components/ui/shared/Loader";
import { Models } from "appwrite";

type SearchResultProps = {
  isSearchFetching: boolean;
  searchedPosts: Models.Document[];
};

export default function SearchResult({ isSearchFetching, searchedPosts }: SearchResultProps) {
  if (isSearchFetching) return <Loader />;
  console.log({ searchedPosts });
  if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  }
  return <p className="text-light-4 mt-10 text-center w-full">No results found</p>;
}
