import { Account, Avatars, Client, Databases, Storage } from "appwrite";

export const appwriteConfig = {
  projectId: import.meta.env.REACT_APP_PROJECT_ID,
  url: import.meta.env.REACT_APP_APPWRITE_URL,
};

export const client = new Client();
client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
