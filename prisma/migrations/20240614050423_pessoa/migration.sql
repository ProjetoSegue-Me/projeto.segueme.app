-- CreateTable
CREATE TABLE "Pessoa" (
    "idPessoa" SERIAL NOT NULL,
    "NomeCompleto" VARCHAR(100) NOT NULL,
    "Email" VARCHAR(45),
    "Instagram" VARCHAR(45),
    "DtNascimento" TIMESTAMP(3) NOT NULL,
    "NomeMae" VARCHAR(60) NOT NULL,
    "NomePai" VARCHAR(60),
    "EstadoCivil" VARCHAR(10),
    "Paroquia" VARCHAR(45) NOT NULL,
    "Sacramento" VARCHAR(45) NOT NULL,
    "Conjuge" VARCHAR(100),
    "Naturalidade" VARCHAR(45) NOT NULL,
    "Religiao" VARCHAR(45) NOT NULL,
    "IgrejaFrequenta" VARCHAR(90) NOT NULL,
    "ECC" SMALLINT NOT NULL,
    "Observacao" VARCHAR(200),
    "foto" BYTEA,

    CONSTRAINT "Pessoa_pkey" PRIMARY KEY ("idPessoa")
);

-- CreateTable
CREATE TABLE "Telefone" (
    "idTelefone" SERIAL NOT NULL,
    "Numero" CHAR(11),
    "PessoaFK" INTEGER NOT NULL,

    CONSTRAINT "Telefone_pkey" PRIMARY KEY ("idTelefone")
);

-- CreateTable
CREATE TABLE "Escolaridade" (
    "idEscola" SERIAL NOT NULL,
    "EscolaridadeCategoria" VARCHAR(45) NOT NULL,
    "Instituicao" VARCHAR(60),
    "Curso" VARCHAR(60),
    "Situacao" VARCHAR(45),
    "PessoaFK" INTEGER NOT NULL,

    CONSTRAINT "Escolaridade_pkey" PRIMARY KEY ("idEscola")
);

-- CreateTable
CREATE TABLE "Endereco" (
    "idEndereco" SERIAL NOT NULL,
    "Rua" VARCHAR(60) NOT NULL,
    "Numero" VARCHAR(10) NOT NULL,
    "Complemento" VARCHAR(60),
    "Bairro" VARCHAR(45) NOT NULL,
    "Cidade" VARCHAR(45) NOT NULL,
    "Estado" VARCHAR(45) NOT NULL,
    "Cep" CHAR(8) NOT NULL,
    "PessoaFK" INTEGER NOT NULL,

    CONSTRAINT "Endereco_pkey" PRIMARY KEY ("idEndereco")
);

-- AddForeignKey
ALTER TABLE "Telefone" ADD CONSTRAINT "Telefone_PessoaFK_fkey" FOREIGN KEY ("PessoaFK") REFERENCES "Pessoa"("idPessoa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escolaridade" ADD CONSTRAINT "Escolaridade_PessoaFK_fkey" FOREIGN KEY ("PessoaFK") REFERENCES "Pessoa"("idPessoa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "Endereco_PessoaFK_fkey" FOREIGN KEY ("PessoaFK") REFERENCES "Pessoa"("idPessoa") ON DELETE RESTRICT ON UPDATE CASCADE;
