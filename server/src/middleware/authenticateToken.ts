import {Request, Response, NextFunction} from "express"
import prisma from "../libs/prismaClient";
import jwt from "jsonwebtoken"

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    console.log('Received token:', token);
  
    if (!token) return res.sendStatus(401);
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
      console.log('Decoded token:', decoded);
      
      const session = await prisma.session.findUnique({ 
        where: { token },
        include: { user: true }
      });
      console.log('Found session:', session);
  
      if (!session || new Date() > session.expiresAt) {
        return res.sendStatus(403);
      }
  
      (req as any).user = session.user;
      next();
    } catch (error) {
      console.error('Authentication error:', error);
      return res.sendStatus(403);
    }
  
  }
  