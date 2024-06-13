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

-- AddForeignKey
ALTER TABLE "Telefone" ADD CONSTRAINT "Telefone_PessoaFK_fkey" FOREIGN KEY ("PessoaFK") REFERENCES "Pessoa"("idPessoa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escolaridade" ADD CONSTRAINT "Escolaridade_PessoaFK_fkey" FOREIGN KEY ("PessoaFK") REFERENCES "Pessoa"("idPessoa") ON DELETE RESTRICT ON UPDATE CASCADE;
