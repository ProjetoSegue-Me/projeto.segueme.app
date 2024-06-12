-- CreateTable
CREATE TABLE "Usuario" (
    "idUser" SERIAL NOT NULL,
    "TipoUsuario" INTEGER NOT NULL,
    "Senha" VARCHAR(60) NOT NULL,
    "Status" SMALLINT NOT NULL,
    "Email" VARCHAR(50) NOT NULL,
    "UsuarioNome" VARCHAR(60) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("idUser")
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

    CONSTRAINT "Endereco_pkey" PRIMARY KEY ("idEndereco")
);

-- CreateTable
CREATE TABLE "Retiro" (
    "idRetiro" SERIAL NOT NULL,
    "EdicaoRetiro" VARCHAR(20) NOT NULL,
    "DiretorEspiritual" VARCHAR(60) NOT NULL,
    "Padroeiro" VARCHAR(60) NOT NULL,
    "DataInicio" TIMESTAMP(3),
    "DataFim" TIMESTAMP(3),
    "EnderecoFK" INTEGER NOT NULL,
    "UsuarioFK" INTEGER NOT NULL,

    CONSTRAINT "Retiro_pkey" PRIMARY KEY ("idRetiro")
);

-- CreateTable
CREATE TABLE "Escolaridade" (
    "idEscola" SERIAL NOT NULL,
    "Escolaridade" VARCHAR(45) NOT NULL,
    "Instituicao" VARCHAR(60),
    "Curso" VARCHAR(60),
    "Situacao" VARCHAR(45),

    CONSTRAINT "Escolaridade_pkey" PRIMARY KEY ("idEscola")
);

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
    "EscolaridadeFK" INTEGER NOT NULL,
    "EnderecoFK" INTEGER NOT NULL,
    "UsuarioFK" INTEGER NOT NULL,

    CONSTRAINT "Pessoa_pkey" PRIMARY KEY ("idPessoa")
);

-- CreateTable
CREATE TABLE "Equipe_de_trabalho" (
    "idEquipe" SERIAL NOT NULL,
    "TrabalhoNome" VARCHAR(40) NOT NULL,
    "Retiros_idRetiro" INTEGER NOT NULL,
    "Pessoa_Participante_pessoaFK" INTEGER NOT NULL,
    "Coord_equipe_pessoaFK" INTEGER NOT NULL,

    CONSTRAINT "Equipe_de_trabalho_pkey" PRIMARY KEY ("idEquipe")
);

-- CreateTable
CREATE TABLE "Convite" (
    "idConvite" SERIAL NOT NULL,
    "Convidante_pessoaFK" INTEGER NOT NULL,
    "Convidado_pessoaFK" INTEGER NOT NULL,

    CONSTRAINT "Convite_pkey" PRIMARY KEY ("idConvite")
);

-- CreateTable
CREATE TABLE "Evento" (
    "idEvento" SERIAL NOT NULL,
    "Tema" VARCHAR(45) NOT NULL,
    "Palestrante" VARCHAR(60) NOT NULL,
    "DataFim" TIMESTAMP(3) NOT NULL,
    "UsuarioFK" INTEGER NOT NULL,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("idEvento")
);

-- CreateTable
CREATE TABLE "Telefone" (
    "idTelefone" SERIAL NOT NULL,
    "Telefone" CHAR(11),
    "PessoaFK" INTEGER NOT NULL,

    CONSTRAINT "Telefone_pkey" PRIMARY KEY ("idTelefone")
);

-- CreateTable
CREATE TABLE "Coord_geral_casal" (
    "idcoord_casal" SERIAL NOT NULL,
    "RetiroFK" INTEGER NOT NULL,
    "Pessoa_Coord_pessoaFK" INTEGER NOT NULL,

    CONSTRAINT "Coord_geral_casal_pkey" PRIMARY KEY ("idcoord_casal")
);

-- CreateTable
CREATE TABLE "Coord_geral_jovem" (
    "idcoord_jovem" SERIAL NOT NULL,
    "RetiroFK" INTEGER NOT NULL,
    "Pessoa_Coord_pessoaFK" INTEGER NOT NULL,

    CONSTRAINT "Coord_geral_jovem_pkey" PRIMARY KEY ("idcoord_jovem")
);

-- CreateTable
CREATE TABLE "Circulo" (
    "idCirculo" SERIAL NOT NULL,
    "Cor" VARCHAR(20) NOT NULL,
    "coord_equipe_e_circulo_idcoord_equipe_e_circulo" INTEGER NOT NULL,
    "RetiroFK" INTEGER NOT NULL,
    "PessoaFK" INTEGER NOT NULL,
    "Coord_circulo_pessoaFK" INTEGER NOT NULL,

    CONSTRAINT "Circulo_pkey" PRIMARY KEY ("idCirculo")
);

-- CreateTable
CREATE TABLE "Participacao" (
    "idParticipacao" SERIAL NOT NULL,
    "EventoFK" INTEGER,
    "RetiroFK" INTEGER,
    "PessoaFK" INTEGER NOT NULL,

    CONSTRAINT "Participacao_pkey" PRIMARY KEY ("idParticipacao")
);

-- AddForeignKey
ALTER TABLE "Retiro" ADD CONSTRAINT "Retiro_EnderecoFK_fkey" FOREIGN KEY ("EnderecoFK") REFERENCES "Endereco"("idEndereco") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Retiro" ADD CONSTRAINT "Retiro_UsuarioFK_fkey" FOREIGN KEY ("UsuarioFK") REFERENCES "Usuario"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pessoa" ADD CONSTRAINT "Pessoa_EnderecoFK_fkey" FOREIGN KEY ("EnderecoFK") REFERENCES "Endereco"("idEndereco") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pessoa" ADD CONSTRAINT "Pessoa_EscolaridadeFK_fkey" FOREIGN KEY ("EscolaridadeFK") REFERENCES "Escolaridade"("idEscola") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pessoa" ADD CONSTRAINT "Pessoa_UsuarioFK_fkey" FOREIGN KEY ("UsuarioFK") REFERENCES "Usuario"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipe_de_trabalho" ADD CONSTRAINT "Equipe_de_trabalho_Coord_equipe_pessoaFK_fkey" FOREIGN KEY ("Coord_equipe_pessoaFK") REFERENCES "Pessoa"("idPessoa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipe_de_trabalho" ADD CONSTRAINT "Equipe_de_trabalho_Pessoa_Participante_pessoaFK_fkey" FOREIGN KEY ("Pessoa_Participante_pessoaFK") REFERENCES "Pessoa"("idPessoa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipe_de_trabalho" ADD CONSTRAINT "Equipe_de_trabalho_Retiros_idRetiro_fkey" FOREIGN KEY ("Retiros_idRetiro") REFERENCES "Retiro"("idRetiro") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Convite" ADD CONSTRAINT "Convite_Convidado_pessoaFK_fkey" FOREIGN KEY ("Convidado_pessoaFK") REFERENCES "Pessoa"("idPessoa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Convite" ADD CONSTRAINT "Convite_Convidante_pessoaFK_fkey" FOREIGN KEY ("Convidante_pessoaFK") REFERENCES "Pessoa"("idPessoa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evento" ADD CONSTRAINT "Evento_UsuarioFK_fkey" FOREIGN KEY ("UsuarioFK") REFERENCES "Usuario"("idUser") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Telefone" ADD CONSTRAINT "Telefone_PessoaFK_fkey" FOREIGN KEY ("PessoaFK") REFERENCES "Pessoa"("idPessoa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coord_geral_casal" ADD CONSTRAINT "Coord_geral_casal_Pessoa_Coord_pessoaFK_fkey" FOREIGN KEY ("Pessoa_Coord_pessoaFK") REFERENCES "Pessoa"("idPessoa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coord_geral_casal" ADD CONSTRAINT "Coord_geral_casal_RetiroFK_fkey" FOREIGN KEY ("RetiroFK") REFERENCES "Retiro"("idRetiro") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coord_geral_jovem" ADD CONSTRAINT "Coord_geral_jovem_Pessoa_Coord_pessoaFK_fkey" FOREIGN KEY ("Pessoa_Coord_pessoaFK") REFERENCES "Pessoa"("idPessoa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coord_geral_jovem" ADD CONSTRAINT "Coord_geral_jovem_RetiroFK_fkey" FOREIGN KEY ("RetiroFK") REFERENCES "Retiro"("idRetiro") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Circulo" ADD CONSTRAINT "Circulo_Coord_circulo_pessoaFK_fkey" FOREIGN KEY ("Coord_circulo_pessoaFK") REFERENCES "Pessoa"("idPessoa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Circulo" ADD CONSTRAINT "Circulo_PessoaFK_fkey" FOREIGN KEY ("PessoaFK") REFERENCES "Pessoa"("idPessoa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Circulo" ADD CONSTRAINT "Circulo_RetiroFK_fkey" FOREIGN KEY ("RetiroFK") REFERENCES "Retiro"("idRetiro") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participacao" ADD CONSTRAINT "Participacao_EventoFK_fkey" FOREIGN KEY ("EventoFK") REFERENCES "Evento"("idEvento") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participacao" ADD CONSTRAINT "Participacao_PessoaFK_fkey" FOREIGN KEY ("PessoaFK") REFERENCES "Pessoa"("idPessoa") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participacao" ADD CONSTRAINT "Participacao_RetiroFK_fkey" FOREIGN KEY ("RetiroFK") REFERENCES "Retiro"("idRetiro") ON DELETE SET NULL ON UPDATE CASCADE;
