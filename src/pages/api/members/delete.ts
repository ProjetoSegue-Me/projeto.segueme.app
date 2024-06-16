import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    try {
      const { id } = req.body;

      // Verificar se o id é um número válido
      const parsedId = parseInt(id as string, 10);
      if (isNaN(parsedId)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }

      await prisma.escolaridade.deleteMany({
        where: {
          PessoaFK: parsedId,
        },
      });

      await prisma.endereco.deleteMany({
        where: {
          PessoaFK: parsedId,
        },
      });

      await prisma.telefone.deleteMany({
        where: {
          PessoaFK: parsedId,
        },
      });

      // Aí, então excluir a pessoa para não dar de erro
      const pessoa = await prisma.pessoa.delete({
        where: { idPessoa: parsedId },
      });

      // Retornar os dados da pessoa excluída
      return res.status(200).json(pessoa);
    } catch (error) {
      console.error(`Failed to delete pessoa with id ${req.body.id}:`, error);
      return res.status(500).json({ error: "Failed to delete pessoa" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
