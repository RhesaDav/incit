import { Request, Response } from "express";
import prisma from "../libs/prismaClient";

export const profileDetail = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: (req.user as any).id },
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const editProfile = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    await prisma.user.update({
      where: { id: (req.user as any).id },
      data: { username },
    });
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
