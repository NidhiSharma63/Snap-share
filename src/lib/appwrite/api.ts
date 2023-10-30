import { account, appwriteConfig, avatars, databases } from "@/lib/appwrite/config";
import { INewUser } from "@/types";
import { ID, Query } from "appwrite";

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

export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailSession(user.email, user.password);
    return session;
  } catch (error) {
    return error;
  }
}

// ============================== GET ACCOUNT
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    console.log(error);
  }
}
// ============================== GET USER
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(appwriteConfig.databseId, appwriteConfig.userCollectionId, [
      Query.equal("accountId", currentAccount.$id),
    ]);

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}
