import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const updatedPessoa = req.body;
    const { idPessoa } = updatedPessoa;

    try {
      const pessoaAtualizada = await prisma.pessoa.update({
        where: { idPessoa: Number(idPessoa) },
        data: {
          NomeCompleto: updatedPessoa.NomeCompleto,
          Email: updatedPessoa.Email,
          Instagram: updatedPessoa.Instagram,
          DtNascimento: new Date(updatedPessoa.DtNascimento),
          NomeMae: updatedPessoa.NomeMae,
          NomePai: updatedPessoa.NomePai,
          EstadoCivil: updatedPessoa.EstadoCivil,
          Paroquia: updatedPessoa.Paroquia,
          Sacramento: updatedPessoa.Sacramento,
          Conjuge: updatedPessoa.Conjuge,
          Naturalidade: updatedPessoa.Naturalidade,
          Religiao: updatedPessoa.Religiao,
          IgrejaFrequenta: updatedPessoa.IgrejaFrequenta,
          ECC: updatedPessoa.ECC,
          Observacao: updatedPessoa.Observacao,
          foto: updatedPessoa.foto ? Buffer.from(updatedPessoa.foto, 'base64') : undefined,
          telefone: {
            upsert: updatedPessoa.telefones.map((telefone: { idTelefone: number, Numero: string }) => ({
              where: { idTelefone: telefone.idTelefone },
              update: { Numero: telefone.Numero },
              create: { Numero: telefone.Numero },
            })),
          },
          escolaridade: updatedPessoa.escolaridade
            ? {
                upsert: {
                  where: { idEscola: updatedPessoa.escolaridade.idEscola },
                  update: {
                    EscolaridadeCategoria: updatedPessoa.escolaridade.EscolaridadeCategoria,
                    Instituicao: updatedPessoa.escolaridade.Instituicao,
                    Curso: updatedPessoa.escolaridade.Curso,
                    Situacao: updatedPessoa.escolaridade.Situacao,
                  },
                  create: {
                    EscolaridadeCategoria: updatedPessoa.escolaridade.EscolaridadeCategoria,
                    Instituicao: updatedPessoa.escolaridade.Instituicao,
                    Curso: updatedPessoa.escolaridade.Curso,
                    Situacao: updatedPessoa.escolaridade.Situacao,
                  },
                },
              }
            : undefined,
          endereco: {
            upsert: {
              where: { idEndereco: updatedPessoa.endereco.idEndereco },
              update: {
                Rua: updatedPessoa.endereco.Rua,
                Numero: updatedPessoa.endereco.Numero,
                Complemento: updatedPessoa.endereco.Complemento,
                Bairro: updatedPessoa.endereco.Bairro,
                Cidade: updatedPessoa.endereco.Cidade,
                Estado: updatedPessoa.endereco.Estado,
                Cep: updatedPessoa.endereco.Cep,
              },
              create: {
                Rua: updatedPessoa.endereco.Rua,
                Numero: updatedPessoa.endereco.Numero,
                Complemento: updatedPessoa.endereco.Complemento,
                Bairro: updatedPessoa.endereco.Bairro,
                Cidade: updatedPessoa.endereco.Cidade,
                Estado: updatedPessoa.endereco.Estado,
                Cep: updatedPessoa.endereco.Cep,
              },
            },
          },
        },
        include: {
          telefone: true,
          escolaridade: true,
          endereco: true,
        },
      });

      res.status(200).json(pessoaAtualizada);
    } catch (error : any) {
      console.error('Failed to update pessoa:', error);
      res.status(500).json({ error: `Failed to update pessoa: ${error.message}` });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
