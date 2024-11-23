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
  postCollectionId: "6741799f0018b7d58ae3",
  storageId: "673b865400143e14c027",
};

const client = new Client();

client
  .setEndpoint(appWriteConfig.endpoint)
  .setProject(appWriteConfig.projectId)
  .setPlatform(appWriteConfig.platfrom);

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

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.postCollectionId
    );
    if (!posts) {
      throw new Error("Something went wrong");
    }
    return posts;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.postCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(5)]
    );
    if (!posts) {
      throw new Error("Something went wrong");
    }
    return posts;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export const searchPosts = async (query: string) => {
  try {
    const posts = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.postCollectionId,
      [Query.search('title', query)]
    );
    if (!posts) {
      throw new Error(`No Post found with this query: ${query}`);
    }
    return posts;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
