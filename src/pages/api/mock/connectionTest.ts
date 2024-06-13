import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await prisma.$connect();
    /* Teste
    await prisma.usuario.create({
      data:{
        TipoUsuario: 1,
        Senha:      "senha",
        Status:      1,
        Email:       "email@email.com",
        UsuarioNome: "algo"
      }
    });
    
    const pessoas = await prisma.pessoa.findMany();
    const usuarios = await prisma.usuario.findMany();

    const endereco = await prisma.endereco.create(data:{rua: endereco.rua, })
    
    res.status(200).json(usuarios);
    */
  } catch (error : any) {
    console.error(error);
    res.status(500).json({ message: 'Database connection failed!', error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}