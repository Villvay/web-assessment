import ky from "ky";
import { z } from "zod";

const usersSchema = z.object({
  users: z.array(
    z.object({
      id: z.number(),
      firstName: z.string(),
      lastName: z.string(),
      maidenName: z.string(),
      age: z.number(),
      gender: z.enum(["female", "male"]),
      email: z.string(),
      phone: z.string(),
      username: z.string(),
      password: z.string(),
      birthDate: z.string(),
      image: z.string(),
      bloodGroup: z.string(),
      height: z.number(),
      weight: z.number(),
      eyeColor: z.string(),
      hair: z.object({
        color: z.string(),
        type: z.enum(["Curly", "Kinky", "Straight", "Wavy"]),
      }),
      ip: z.string(),
      address: z.object({
        address: z.string(),
        city: z.string(),
        state: z.string(),
        stateCode: z.string(),
        postalCode: z.string(),
        coordinates: z.object({
          lat: z.number(),
          lng: z.number(),
        }),
        country: z.enum(["United States"]),
      }),
      macAddress: z.string(),
      university: z.string(),
      bank: z.object({
        cardExpire: z.string(),
        cardNumber: z.string(),
        cardType: z.string(),
        currency: z.string(),
        iban: z.string(),
      }),
      company: z.object({
        department: z.string(),
        name: z.string(),
        title: z.string(),
        address: z.object({
          address: z.string(),
          city: z.string(),
          state: z.string(),
          stateCode: z.string(),
          postalCode: z.string(),
          coordinates: z.object({
            lat: z.number(),
            lng: z.number(),
          }),
          country: z.enum(["United States"]),
        }),
      }),
      ein: z.string(),
      ssn: z.string(),
      userAgent: z.string(),
      crypto: z.object({
        coin: z.enum(["Bitcoin"]),
        wallet: z.enum(["0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a"]),
        network: z.enum(["Ethereum (ERC20)"]),
      }),
      role: z.enum(["admin", "moderator", "user"]),
    })
  ),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

export const getUsers = async () => {
  const response = await ky.get("https://dummyjson.com/users").json();

  return await usersSchema.parseAsync(response);
};

const postsSchema = z.object({
  posts: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      body: z.string(),
      tags: z.array(z.string()),
      reactions: z.object({
        likes: z.number(),
        dislikes: z.number(),
      }),
      views: z.number(),
      userId: z.number(),
    })
  ),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

export const getUserPosts = async (userId: number) => {
  const response = await ky
    .get(`https://dummyjson.com/posts/user/${userId}`)
    .json();

  return await postsSchema.parseAsync(response);
};
