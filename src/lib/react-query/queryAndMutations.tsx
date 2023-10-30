import { createUserAccount, signInAccount, signOutAccount } from "@/lib/appwrite/api";
import { INewUser } from "@/types";
import { useMutation } from "@tanstack/react-query";

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
