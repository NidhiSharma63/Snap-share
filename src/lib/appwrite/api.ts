import { account } from "@/lib/appwrite/config";
import { INewUser } from "@/types";
import { ID } from "appwrite";

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(ID.unique(), user.email, user.password, user.name);
    return newAccount;
  } catch (error) {
    console.log(error);
    return error;
  }
}
