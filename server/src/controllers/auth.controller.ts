import { Request, Response } from "express";
import prisma from "../libs/prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { sendVerificationEmail } from "../utils/sendEmailVerification";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const isAlreadyExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isAlreadyExist) {
      const token = jwt.sign(
        { userId: isAlreadyExist.id },
        process.env.JWT_SECRET!
      );
      await sendVerificationEmail(email, token);
      return res.status(400).json({
        message: "Email already exist. Please verify your email",
      });
    }
    const hashedPass = await bcrypt.hash(password, 10);

    const data = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPass,
        authType: "email",
      },
    });

    const token = jwt.sign({ userId: data.id }, process.env.JWT_SECRET!);
    await sendVerificationEmail(email, token);

    return res.status(201).json({
      message: "Register success, please check your email",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.password) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        loginCount: { increment: 1 },
        lastLoginAt: new Date(),
      },
    });

    await prisma.session.create({
      data: {
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        token,
      },
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ isVerified: user.isVerified ,  token });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    await prisma.user.update({
      where: { id: (req.user as any).id },
      data: { lastLogoutAt: new Date() },
    });
    await prisma.session.deleteMany({
      where: { userId: (req.user as any).id },
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const checkAuth = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: (req.user as any).id },
    });

    if (!user || !user.isVerified) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    res.status(200).json({ message: 'Authenticated' });
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};


export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      to: email,
      from: process.env.SMTP_USERNAME,
      subject: "Password Reset",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n
      ${process.env.BASE_URL_CLIENT}/reset-password/${user.id}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { userId, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.query;

  try {
    const decoded: any = jwt.verify(token as string, process.env.JWT_SECRET!);
    await prisma.user.update({
      where: { id: decoded.userId },
      data: { isVerified: true },
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect(`${process.env.BASE_URL_CLIENT}/dashboard`);
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

export const resendVerificationEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Email is already verified" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    await sendVerificationEmail(email, token);

    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};