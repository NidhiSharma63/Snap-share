import { createUserAccount } from "@/lib/appwrite/api";
import { useMutation } from "@tanstack/react-query";

export const useCreateUserAccountMutation = () => {
  return useMutation({
    mutationFn: (user) => {
      createUserAccount(user);
    },
  });
};
