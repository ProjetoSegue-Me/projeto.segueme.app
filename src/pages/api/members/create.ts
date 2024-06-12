// CONSERTAR

// Faz a criação dos valores das colunas a partir do modelo do banco

// src/pages/api/pessoas/create.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {
      NomeCompleto,
      Email,
      Instagram,
      DtNascimento,
      NomeMae,
      NomePai,
      EstadoCivil,
      Paroquia,
      Sacramento,
      Conjuge,
      Naturalidade,
      Religiao,
      IgrejaFrequenta,
      ECC,
      Observacao,
      foto,
      EscolaridadeFK,
      EnderecoFK,
      UsuarioFK
    } = req.body;

    try {
      const newPessoa = await prisma.pessoa.create({
        data: {
          NomeCompleto,
          Email,
          Instagram,
          DtNascimento: new Date(DtNascimento),
          NomeMae,
          NomePai,
          EstadoCivil,
          Paroquia,
          Sacramento,
          Conjuge,
          Naturalidade,
          Religiao,
          IgrejaFrequenta,
          ECC,
          Observacao,
          foto: foto ? Buffer.from(foto, 'base64') : null,
          EscolaridadeFK: EscolaridadeFK || undefined,
          EnderecoFK: EnderecoFK || undefined,
          UsuarioFK: UsuarioFK || undefined
        }
      });

      res.status(201).json(newPessoa);
    } catch (error) {
      console.error('Failed to create pessoa:', error);
      res.status(500).json({ error: 'Failed to create pessoa' });
    } finally {
      await prisma.$disconnect();
    }
  } else if (req.method === 'GET') {
    // Aqui você pode adicionar a lógica para lidar com requisições GET, se necessário
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
