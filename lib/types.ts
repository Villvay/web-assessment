import { getUsers, getUserPosts } from "./data";

export type User = Awaited<ReturnType<typeof getUsers>>["users"][number];

export type Post = Awaited<ReturnType<typeof getUserPosts>>["posts"][number];
