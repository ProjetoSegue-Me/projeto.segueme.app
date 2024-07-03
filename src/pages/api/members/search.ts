import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const searchTerm = (req.query.searchTerm as string || '').trim();

    if (!searchTerm) {
      res.status(400).json({ error: 'Search term cannot be empty' });
      return;
    }

    try {
      const pessoas = await prisma.pessoa.findMany({
        where: {
          NomeCompleto: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        select: {
          NomeCompleto: true,
        },
      });

      const nomes = pessoas.map(pessoa => pessoa.NomeCompleto);

      res.status(200).json(nomes);
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