import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const newPessoa = req.body;
    console.log('Received data:', newPessoa);

    try {
      // Criação da pessoa
      const createdPessoa = await prisma.pessoa.create({
        data: {
          NomeCompleto: newPessoa.NomeCompleto,
          Email: newPessoa.Email,
          Instagram: newPessoa.Instagram,
          DtNascimento: new Date(newPessoa.DtNascimento),
          NomeMae: newPessoa.NomeMae,
          NomePai: newPessoa.NomePai,
          EstadoCivil: newPessoa.EstadoCivil,
          Paroquia: newPessoa.Paroquia,
          Sacramento: newPessoa.Sacramento,
          Conjuge: newPessoa.Conjuge,
          Naturalidade: newPessoa.Naturalidade,
          Religiao: newPessoa.Religiao,
          IgrejaFrequenta: newPessoa.IgrejaFrequenta,
          ECC: newPessoa.ECC,
          Observacao: newPessoa.Observacao,
          foto: newPessoa.foto ? Buffer.from(newPessoa.foto, 'base64') : undefined,
          telefone: {
            create: newPessoa.telefones.map((telefone: { Numero: string }) => ({
              Numero: telefone.Numero,
            })),
          },
          escolaridade: {
            create: {
              EscolaridadeCategoria: newPessoa.escolaridade.EscolaridadeCategoria,
              Instituicao: newPessoa.escolaridade.Instituicao,
              Curso: newPessoa.escolaridade.Curso,
              Situacao: newPessoa.escolaridade.Situacao,
            },
          },
          endereco: {
            create: {
              Rua: newPessoa.endereco.Rua,
              Numero: newPessoa.endereco.Numero,
              Complemento: newPessoa.endereco.Complemento,
              Bairro: newPessoa.endereco.Bairro,
              Cidade: newPessoa.endereco.Cidade,
              Estado: newPessoa.endereco.Estado,
              Cep: newPessoa.endereco.Cep,
            },
          },
        },
        include: {
          telefone: true,
          escolaridade: true,
          endereco: true,
        },
      });

      res.status(201).json(createdPessoa);
    } catch (error: any) {
      console.error('Failed to create pessoa:', error);
      res.status(500).json({ error: `Failed to create pessoa: ${error.message}` });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
