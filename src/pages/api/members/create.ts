import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const pessoaData = req.body;

    try {
      const existingPessoa = pessoaData.idPessoa
        ? await prisma.pessoa.findUnique({
            where: { idPessoa: pessoaData.idPessoa },
            include: {
              telefone: true,
              escolaridade: true,
              endereco: true,
            },
          })
        : null;

      let pessoa;

      if (existingPessoa) {
        pessoa = await prisma.pessoa.update({
          where: { idPessoa: existingPessoa.idPessoa },
          data: {
            NomeCompleto: pessoaData.NomeCompleto,
            Email: pessoaData.Email,
            Instagram: pessoaData.Instagram,
            DtNascimento: new Date(pessoaData.DtNascimento),
            NomeMae: pessoaData.NomeMae,
            NomePai: pessoaData.NomePai,
            EstadoCivil: pessoaData.EstadoCivil,
            Paroquia: pessoaData.Paroquia,
            Sacramento: pessoaData.Sacramento,
            Conjuge: pessoaData.Conjuge,
            Naturalidade: pessoaData.Naturalidade,
            Religiao: pessoaData.Religiao,
            IgrejaFrequenta: pessoaData.IgrejaFrequenta,
            ECC: pessoaData.ECC,
            Observacao: pessoaData.Observacao,
            foto: pessoaData.foto ? Buffer.from(pessoaData.foto, 'base64') : undefined,
            telefone: {
              upsert: pessoaData.telefones.map((telefone: { idTelefone: number, Numero: string }) => ({
                where: { idTelefone: telefone.idTelefone },
                update: { Numero: telefone.Numero },
                create: { Numero: telefone.Numero },
              })),
            },
            escolaridade: pessoaData.escolaridade
              ? {
                  upsert: {
                    where: { idEscola: pessoaData.escolaridade.idEscola },
                    update: {
                      EscolaridadeCategoria: pessoaData.escolaridade.EscolaridadeCategoria,
                      Instituicao: pessoaData.escolaridade.Instituicao,
                      Curso: pessoaData.escolaridade.Curso,
                      Situacao: pessoaData.escolaridade.Situacao,
                    },
                    create: {
                      EscolaridadeCategoria: pessoaData.escolaridade.EscolaridadeCategoria,
                      Instituicao: pessoaData.escolaridade.Instituicao,
                      Curso: pessoaData.escolaridade.Curso,
                      Situacao: pessoaData.escolaridade.Situacao,
                    },
                  },
                }
              : undefined,
            endereco: {
              upsert: {
                where: { idEndereco: pessoaData.endereco.idEndereco },
                update: {
                  Rua: pessoaData.endereco.Rua,
                  Numero: pessoaData.endereco.Numero,
                  Complemento: pessoaData.endereco.Complemento,
                  Bairro: pessoaData.endereco.Bairro,
                  Cidade: pessoaData.endereco.Cidade,
                  Estado: pessoaData.endereco.Estado,
                  Cep: pessoaData.endereco.Cep,
                },
                create: {
                  Rua: pessoaData.endereco.Rua,
                  Numero: pessoaData.endereco.Numero,
                  Complemento: pessoaData.endereco.Complemento,
                  Bairro: pessoaData.endereco.Bairro,
                  Cidade: pessoaData.endereco.Cidade,
                  Estado: pessoaData.endereco.Estado,
                  Cep: pessoaData.endereco.Cep,
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
      } else {
        pessoa = await prisma.pessoa.create({
          data: {
            NomeCompleto: pessoaData.NomeCompleto,
            Email: pessoaData.Email,
            Instagram: pessoaData.Instagram,
            DtNascimento: new Date(pessoaData.DtNascimento),
            NomeMae: pessoaData.NomeMae,
            NomePai: pessoaData.NomePai,
            EstadoCivil: pessoaData.EstadoCivil,
            Paroquia: pessoaData.Paroquia,
            Sacramento: pessoaData.Sacramento,
            Conjuge: pessoaData.Conjuge,
            Naturalidade: pessoaData.Naturalidade,
            Religiao: pessoaData.Religiao,
            IgrejaFrequenta: pessoaData.IgrejaFrequenta,
            ECC: pessoaData.ECC,
            Observacao: pessoaData.Observacao,
            foto: pessoaData.foto ? Buffer.from(pessoaData.foto, 'base64') : undefined,
            telefone: {
              create: pessoaData.telefones.map((telefone: { Numero: string }) => ({
                Numero: telefone.Numero,
              })),
            },
            escolaridade: pessoaData.escolaridade
              ? {
                  create: {
                    EscolaridadeCategoria: pessoaData.escolaridade.EscolaridadeCategoria,
                    Instituicao: pessoaData.escolaridade.Instituicao,
                    Curso: pessoaData.escolaridade.Curso,
                    Situacao: pessoaData.escolaridade.Situacao,
                  },
                }
              : undefined,
            endereco: {
              create: {
                Rua: pessoaData.endereco.Rua,
                Numero: pessoaData.endereco.Numero,
                Complemento: pessoaData.endereco.Complemento,
                Bairro: pessoaData.endereco.Bairro,
                Cidade: pessoaData.endereco.Cidade,
                Estado: pessoaData.endereco.Estado,
                Cep: pessoaData.endereco.Cep,
              },
            },
          },
          include: {
            telefone: true,
            escolaridade: true,
            endereco: true,
          },
        });
      }

      res.status(200).json(pessoa);
    } catch (error: any) {
      console.error('Failed to create/update pessoa:', error);
      res.status(500).json({ error: `Failed to create/update pessoa: ${error.message}` });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
