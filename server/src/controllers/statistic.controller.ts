import { Request, Response } from "express";
import prisma from "../libs/prismaClient";

export const getStatistic = async (req: Request, res: Response) => {
  try {
    const totalUsers = await prisma.user.count();

    const activeSessionsToday = await prisma.session.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    });

    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d;
    });

    const activeSessions7Days = await Promise.all(
      last7Days.map(async (date) => {
        return prisma.session.count({
          where: {
            createdAt: {
              gte: new Date(date.setHours(0, 0, 0, 0)),
              lt: new Date(date.setHours(23, 59, 59, 999)),
            },
          },
        });
      })
    );

    const averageActiveSessions7Days =
      activeSessions7Days.reduce((a, b) => a + b, 0) / 7;

    res.json({
      totalUsers,
      activeSessionsToday,
      averageActiveSessions7Days,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
