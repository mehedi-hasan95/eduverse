"use server";

import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const onGetAuthenticatedUser = async () => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };
    const findUser = await db.user.findUnique({
      where: { clerkId: user.id },
      select: {
        firstname: true,
        lastname: true,
        id: true,
        userType: true,
      },
    });
    if (findUser) {
      return {
        status: 200,
        id: findUser.id,
        userName: `${findUser?.firstname} ${findUser.lastname}`,
        userType: findUser.userType,
        image: user.imageUrl,
      };
    }
    return {
      status: 404,
    };
  } catch (error) {
    console.log(error);
    return { status: 400 };
  }
};

export const onSignUpUser = async (data: {
  firstname: string;
  lastname: string;
  image: string;
  clerkId: string;
  userType: undefined;
}) => {
  try {
    const createdUser = await db.user.create({
      data: { ...data },
    });
    if (createdUser) {
      return {
        status: 200,
        message: "User created successfully",
        id: createdUser.id,
      };
    }
    return {
      status: 400,
      message: "User could not be created! Try again",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 400,
      message: "Opps! Something went wrong. Try again",
    };
  }
};

export const onSignInUser = async (clerkId: string) => {
  try {
    const loginUser = await db.user.findUnique({
      where: { clerkId },
      select: {
        id: true,
        group: {
          select: {
            id: true,
            channel: {
              select: {
                id: true,
              },
              take: 1,
              orderBy: { createdAt: "desc" },
            },
          },
        },
      },
    });
    if (loginUser) {
      if (loginUser.group.length > 0) {
        return {
          status: 207,
          id: loginUser.id,
          groupId: loginUser.group[0].id,
          channelId: loginUser.group[0].channel[0].id,
        };
      }
      return {
        status: 200,
        message: "User successfully logged in",
        id: loginUser.id,
      };
    }
    return {
      status: 400,
      message: "User could not be logged in! Try again",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 400,
      message: "Oops! something went wrong. Try again",
    };
  }
};
