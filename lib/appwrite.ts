import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1", // Your API Endpoint
  projectId: "67f938e90016c65a8a33", // Your project ID
  platform: "com.mwd.wallyai",
  databaseId: "67f97057001d6efb3403", // Your database ID
  userCollectionId: "67f9709e0020ef6a8678", // Your user collection ID
  videosCollectionId: "67f97149002b3c6e5b55", // Your videos collection ID
  storageID: "67f977460021f98c23b1", // Your storage ID
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) {
      throw new Error("User creation failed");
    }
    const avatarUrl = avatars.getInitials(name);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      { accountId: newAccount.$id, userName: name, email, avatar: avatarUrl }
    );

    return newUser;
  } catch (error) {
    console.log("Error creating user:", error);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log("Error signing in:", error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    // console.log("Current account:", currentAccount);

    if (!currentAccount) {
      throw new Error("No User");
    }

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser.documents.length) {
      throw new Error("No User Found");
    }

    return currentUser.documents[0];
  } catch (error) {
    console.log("Error getting current user:", error);
  }
  return null;
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videosCollectionId,
      [Query.orderDesc("$createdAt")]
    );

    return posts.documents;
  } catch (error) {
    console.log("Error getting all posts:", error);
    throw new Error("Error getting all posts:", error);
  }
  return null;
};

export const searchPosts = async (query: string) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videosCollectionId,
      [Query.search("title", query), Query.limit(5)]
    );

    return posts.documents;
  } catch (error) {
    console.log("Error getting search results:", error);
    throw new Error("Error getting search results:", error);
  }
  return null;
};

export const getUserPosts = async (userId: string) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videosCollectionId,
      [Query.equal("creator", userId)]
    );

    return posts.documents;
  } catch (error) {
    console.log("Error getting user posts:", error);
    throw new Error("Error getting user posts:", error);
  }
  return null;
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videosCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(5)]
    );

    return posts.documents;
  } catch (error) {
    console.log("Error getting latest posts:", error);
    throw new Error("Error getting latest posts:", error);
  }
  return null;
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    console.log("Error signing out:", error);
  }
};

export const getFilePreview = async (fileId, type) => {
  let fileUrl;

  console.log(fileId);

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(appwriteConfig.storageID, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(appwriteConfig.storageID, fileId);
    } else {
      throw new Error("Invalid file type");
    }

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
};

export const uploadFile = async (file, type) => {
  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageID,
      ID.unique(),
      asset
    );

    console.log(uploadedFile);

    const fileUrl = await getFilePreview(uploadedFile.$id, type);

    if (fileUrl) {
      throw new Error("No file url");
    }

    return fileUrl;
  } catch (error) {
    console.error(error);
  }
};

export const createVideo = async (form) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videosCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (err) {
    console.error(err);
  }
};
