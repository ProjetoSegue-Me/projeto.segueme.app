import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const pessoas = await prisma.pessoa.findMany({
        include: {
          telefone: true,
          escolaridade: true,
        },
      });

      console.log('Pessoas encontradas:', pessoas); // log para depuração no console

      res.status(200).json(pessoas);
    } catch (error) {
      console.error('Failed to fetch pessoas:', error);
      res.status(500).json({ error: 'Failed to fetch pessoas' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}