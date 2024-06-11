import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await prisma.$connect();
    res.status(200).json({ message: 'Database connection successful!' });
  } catch (error : any) {
    console.error(error);
    res.status(500).json({ message: 'Database connection failed!', error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}