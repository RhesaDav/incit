import { Request, Response } from "express";
import prisma from "../libs/prismaClient";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        createdAt: true,
        loginCount: true,
        lastLoginAt: true,
        lastLogoutAt: true,
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
