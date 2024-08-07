import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../libs/prismaClient";

export const googleCallback = async (req: Request, res: Response) => {
  try {
    const token = jwt.sign(
      { userId: (req.user as any).id },
      process.env.JWT_SECRET!
    );

    await prisma.session.create({
      data: {
        userId: (req.user as any).id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        token
      },
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.redirect(`${process.env.BASE_URL_CLIENT}/oauth-callback`);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const facebookCallback = async (req: Request, res: Response) => {
  try {
    const token = jwt.sign(
      { userId: (req.user as any).id },
      process.env.JWT_SECRET!
    );

    await prisma.session.create({
      data: {
        userId: (req.user as any).id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        token
      },
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.redirect(`${process.env.BASE_URL_CLIENT}/oauth-callback`);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
