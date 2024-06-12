// src/pages/api/pessoas/[id].ts verificar depois

import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const pessoa = await prisma.pessoa.findUnique({
        where: { idPessoa: Number(id) },
      });

      if (!pessoa) {
        res.status(404).json({ error: 'Pessoa not found' });
      } else {
        res.status(200).json(pessoa);
      }
    } catch (error) {
      console.error(`Failed to fetch pessoa with id ${id}:`, error);
      res.status(500).json({ error: 'Failed to fetch pessoa' });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
