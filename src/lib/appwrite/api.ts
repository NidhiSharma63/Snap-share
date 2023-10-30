import { account, appwriteConfig, avatars, databases } from "@/lib/appwrite/config";
import { INewUser } from "@/types";
import { ID } from "appwrite";

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(ID.unique(), user.email, user.password, user.name);
    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      userName: user.username /** getting user name from form because we are not setting the user name in database
      initially */,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    return error;
  }
}

/**
 *
 * @param this will save the user to database because after sign-up user needs to set into the database also
 */
export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  userName?: string;
}) {
  try {
    const newUser = databases.createDocument(
      appwriteConfig.databseId /**in database */,
      appwriteConfig.userCollectionId /**we are modifying the user collections */,
      ID.unique(),
      user
    );
    return newUser;
  } catch (error) {
    return error;
  }
}
