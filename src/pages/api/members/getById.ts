import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      // Parse JSON body if exists
      const { id } = req.body || req.query;

      // Verifique se o id é um número válido
      const parsedId = parseInt(id as string, 10);
      if (isNaN(parsedId)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }

      const pessoa = await prisma.pessoa.findUnique({
        where: { idPessoa: parsedId },
        include: {
          telefone: true,
          escolaridade: true,
          endereco: true,
        },
      });

      if (!pessoa) {
        return res.status(404).json({ error: "Pessoa not found" });
      } else {
        return res.status(200).json(pessoa);
      }
    } catch (error) {
      const { id } = req.body || req.query;
      console.error(`Failed to fetch pessoa with id ${id}:`, error);
      return res.status(500).json({ error: "Failed to fetch pessoa" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
