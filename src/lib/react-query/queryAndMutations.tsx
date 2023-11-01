import { createPost, createUserAccount, signInAccount, signOutAccount } from "@/lib/appwrite/api";
import { INewPost, INewUser } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "./querykeys";

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) => signInAccount(user),
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: () => signOutAccount(),
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        // queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};
