import {
  ID,
  Query,
  Client,
  Account,
  Avatars,
  Databases,
} from "react-native-appwrite";
import { appWriteConfig } from "./utils";
import { FormStateSignIn, FormStateSignUp, Post } from "@/types";

const client = new Client();

client
  .setEndpoint(appWriteConfig.endpoint)
  .setProject(appWriteConfig.projectId)
  .setPlatform(appWriteConfig.platfrom);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (form: FormStateSignUp) => {
  try {
    const { email, password, username } = form;
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
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export const signIn = async (form: FormStateSignIn) => {
  const { email, password } = form;
  try {
    const session = await account.createEmailPasswordSession(email, password);
    if (!session) {
      throw new Error("Something went wrong");
    }
    return session;
  } catch (error) {
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
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.postCollectionId,
      [Query.orderDesc("$createdAt")]
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
      [Query.search("title", query)]
    );
    if (!posts) {
      throw new Error(`No Post found with this query: ${query}`);
    }
    return posts;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export const getPostByUserId = async (userId: string) => {
  try {
    const posts = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.postCollectionId,
      [Query.equal("users", userId), Query.orderDesc("$createdAt")]
    );
    if (posts.documents.length === 0) {
      throw new Error(`No Post found with this userId: ${userId}`);
    }
    return posts;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    if (!session) {
      throw new Error("Something went wrong");
    }
    return session;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export const createPost = async (post: Post) => {
  try {
    const newPost = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.postCollectionId,
      ID.unique(),
      post
    );
    if (!newPost) {
      throw new Error("Something went wrong");
    }
    return newPost;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
