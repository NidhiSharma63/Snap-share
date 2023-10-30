import { Account, Avatars, Client, Databases, Storage } from "appwrite";

console.log(import.meta.env.REACT_APP_PROJECT_ID, "import.meta.env.REACT_APP_PROJECT_ID");
export const appwriteConfig = {
  projectId: import.meta.env.REACT_APP_PROJECT_ID,
  url: import.meta.env.REACT_APP_APPWRITE_URL,
};

const client = new Client();
client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
