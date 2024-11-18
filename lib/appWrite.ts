import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const appWriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platfrom: "com.subh.pixo",
  projectId: "673b818a0036f2423901",
  databaseId: "673b8379002ff515765b",
  userCollectionId: "673b83ae002e2f79aa8f",
  videoCollectionId: "673b83e30026885b7515",
  storageId: "673b865400143e14c027",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appWriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appWriteConfig.projectId) // Your project ID
  .setPlatform(appWriteConfig.platfrom); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) {
      throw new Error("Something went wrong");
    }
    const avatarUrl = avatars.getInitials(username);
    const newUser = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      ID.unique(),
      { accountId: newAccount.$id, email, username, avatar: avatarUrl }
    );
    if (!newUser) {
      throw new Error("Something went wrong");
    }
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    if (!session) {
      throw new Error("Something went wrong");
    }
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export const getCurrentUser = async () => {
  try {
    const currentUser = await account.get();
    if (!currentUser) {
      throw new Error();
    }
    const user = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      [Query.equal("accountId", currentUser.$id)]
    );
    if (!user) {
      throw new Error();
    }
    return user.documents[0];
  } catch (error) {
    console.log(error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
