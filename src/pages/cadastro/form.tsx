import { useCallback, useState } from "react";
import * as yup from "yup";
import Header from "@/components/Header";
import Titulo from "@/components/Titulo";
import { useRouter } from "next/router";

export default function Form() {
  const router = useRouter()
  const [page, setPage] = useState(1);

  const [formValues, setFormValues] = useState({
    NomeCompleto: "",
    Email: "",
    Instagram: "",
    DtNascimento: "",
    NomeMae: "",
    NomePai: "",
    EstadoCivil: "",
    Paroquia: "",
    Sacramento: [],
    Conjuge: "",
    Naturalidade: "",
    Religiao: "",
    IgrejaFrequenta: "",
    ECC: "",
    Observacao: "",
    foto: "",
    telefones: [{ Numero: "" }],
    escolaridade: {
      EscolaridadeCategoria: "",
      Instituicao: "",
      Curso: "",
      Situacao: "",
    },
    endereco: {
      Rua: "",
      Numero: "",
      Complemento: "",
      Bairro: "",
      Cidade: "",
      Estado: "",
      Cep: "",
    },
  });

  /*Renderizações condicionais da cor dos botões, alterar depois caso sobre tempo pra animar */
  const activeButton =
    "bg-colorStep w-[2.5vw] h-[2.5vw] rounded-full text-center text-[1.2vw]";
  const inactiveButton =
    "bg-white w-[2.5vw] h-[2.5vw] rounded-full text-center text-[1.2vw]";
  const activeSpan = (
    <div className="flex items-center">
      <div className="border-t-[0.15vw] w-[8vw] border-colorStep flex-grow"></div>
      <span className="h-[0.65vw] w-[0.65vw] bg-colorStep rounded-full inline-block"></span>
    </div>
  );
  const inactiveSpan = (
    <div className="flex items-center">
      <div className="border-t-[0.15vw] w-[8vw] border-formColor flex-grow"></div>
      <span className="h-[0.65vw] w-[0.65vw] bg-formColor rounded-full inline-block"></span>
    </div>
  );

  const handlePageChange = (target: number) => {
    if (target >= 1 && target <= 4) {
      setPage(target);
    }
  };

  /*Renderização condicional do Titulo */
  const handlePageName = () => {
    switch (page) {
      case 1:
        return <Titulo conteudo="Cadastro - Dados Pessoais" />;

      case 2:
        return <Titulo conteudo="Cadastro - Contato" />;

      case 3:
        return <Titulo conteudo="Cadastro - Dados Religiosos" />;

      case 4:
        return <Titulo conteudo="Cadastro - Dados Diversos" />;

      default:
        break;
    }
  };
  //Funções dos botões
  const handleNext = () => {
    setPage((prevPage) => Math.min(prevPage + 1, 4));
  };

  const handleBack = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleReset = () => {
    setPage(1);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/members/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        console.log("Pessoa cadastrada com sucesso!");
        router.push("/cadastro")
      } else {
        console.error("Erro ao cadastrar pessoa:", response.statusText);
        router.push({pathname:"/erro", query: {message:"Erro ao cadastrar pessoa"}})
      }
    } catch (error:any) {
      console.error("Erro ao realizar requisição:", error.message);
      router.push({ pathname: "/erro", query:  {message:"Erro ao realizar requisição"}})
    }
  };
  //Renderização condicional dos botões
  const handleButtonRender = () => {
    switch (page) {
      case 1:
        return (
          <button
            className="mt-[5vw] mx-auto w-fit text-[1.2vw] font-roboto bg-[#FFB718] rounded-full px-[2.5vw] py-[0.75vw]"
            type="button"
            onClick={handleNext}
          >
            Avançar &gt;
          </button>
        );
      case 2:
      case 3:
        return (
          <>
            <button
              className="mt-[5vw]  w-fit text-[1.2vw] font-roboto bg-[#FFB718] rounded-full px-[2.5vw] py-[0.75vw]"
              type="button"
              onClick={handleBack}
            >
              &lt; Voltar
            </button>
            <button
              className="mt-[5vw] ml-[5vw] w-fit text-[1.2vw] font-roboto bg-[#FFB718] rounded-full px-[2.5vw] py-[0.75vw]"
              type="button"
              onClick={handleNext}
            >
              Avançar &gt;
            </button>
          </>
        );
      case 4:
        return (
          <>
            <button
              className="mt-[5vw]  w-fit text-[1.2vw] font-roboto bg-[#FFB718] rounded-full px-[2.5vw] py-[0.75vw]"
              type="button"
              onClick={handleBack}
            >
              &lt; Voltar
            </button>
            <button
              className="mt-[5vw]  w-fit text-[1.2vw] font-roboto bg-[#FFB718] rounded-full px-[2.5vw] py-[0.75vw]"
              type="button"
              onClick={handleSubmit}
            >
              Finalizar
            </button>
          </>
        );
      default:
        return (
          <button
            className="mt-[5vw]  w-fit text-[1.2vw] font-roboto bg-[#FFB718] rounded-full px-[2.5vw] py-[0.75vw]"
            type="button"
            onClick={handleReset}
          >
            Restaurar
          </button>
        );
    }
  };

  return (
    <main className="bg-bodyColor min-h-screen">
      <Header />
      <div className="mt-[2vw]">{handlePageName()}</div>

      {/*Navegação*/}
      <nav className="h-[4vw] w-[70vw] mx-auto flex justify-between py-[0.75vw] mt-[2vw] items-center">
        <button
          className={page >= 1 ? activeButton : inactiveButton}
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
        <p className="text-[1.2vw] font-roboto">Etapa 1</p>

        {page >= 1 ? activeSpan : inactiveSpan}

        <button
          className={page >= 2 ? activeButton : inactiveButton}
          onClick={() => handlePageChange(2)}
        >
          2
        </button>
        <p className="text-[1.2vw] font-roboto">Etapa 2</p>

        {page >= 2 ? activeSpan : inactiveSpan}

        <button
          className={page >= 3 ? activeButton : inactiveButton}
          onClick={() => handlePageChange(3)}
        >
          3
        </button>
        <p className="text-[1.2vw] font-roboto">Etapa 3</p>

        {page >= 3 ? activeSpan : inactiveSpan}

        <button
          className={page === 4 ? activeButton : inactiveButton}
          onClick={() => handlePageChange(4)}
        >
          4
        </button>
        <p className="text-[1.2vw] font-roboto">Etapa 4</p>
      </nav>

      {/*Formulário*/}

      <form className="w-[90vw] mx-auto bg-backgroundFormColor py-[2.5vw] mt-[2.5vw]">
        {/* Etapa 1 */}
        {page === 1 && (
          <section className="w-[90%] mx-auto flex flex-col gap-[2vw]">
            <div className="flex justify-between">
              <div className="w-full flex justify-between">
                <label
                  className="text-[1.2vw] font-roboto ml-[-0.5vw] py-[0.25vw]"
                  htmlFor="jovemCasalFichas"
                >
                  Jovem/Casal Fichas
                </label>
                <input
                  className="w-[82.5%] text-[1.2vw] font-roboto shadow appearance-none border rounded py-[0.25vw] text-gray-700 leading-tight focus:outline-colorStep focus:shadow-outline"
                  id="jovemCasalFichas"
                  type="text"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <div className="w-full flex justify-between">
                <label
                  className="text-[1.2vw] font-roboto ml-[-0.5vw] py-[0.25vw]"
                  htmlFor="dataRecebimento"
                >
                  Data de Recebimento
                </label>
                <input
                  className="w-[82.5%] text-[1.2vw] font-roboto shadow appearance-none border rounded py-[0.25vw] text-gray-700 leading-tight focus:outline-colorStep focus:shadow-outline"
                  id="dataRecebimento"
                  type="date"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <div className="w-full flex justify-between">
                <label
                  className="relative text-[1.2vw] font-roboto ml-[-0.5vw] py-[0.25vw]"
                  htmlFor="nomeCompleto"
                >
                  <span className="absolute left-[-1vw] text-red-500">*</span>
                  Nome completo
                </label>
                <input
                  className="w-[82.5%] text-[1.2vw] font-roboto shadow appearance-none border rounded py-[0.25vw] text-gray-700 leading-tight focus:outline-colorStep focus:shadow-outline"
                  id="nomeCompleto"
                  type="text"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <div className="w-full flex justify-between">
                <label
                  className="text-[1.2vw] font-roboto ml-[-0.5vw] py-[0.25vw]"
                  htmlFor="conjuge"
                >
                  Cônjuge
                </label>
                <input
                  className="w-[82.5%] text-[1.2vw] font-roboto shadow appearance-none border rounded py-[0.25vw] text-gray-700 leading-tight focus:outline-colorStep focus:shadow-outline"
                  id="conjuge"
                  type="text"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <div className="w-[50%] flex justify-between">
                <label
                  className="relative text-[1.2vw] font-roboto ml-[-0.5vw] py-[0.25vw]"
                  htmlFor="nascimento"
                >
                  <span className="absolute left-[-1vw] text-red-500">*</span>
                  Nascimento
                </label>
                <input
                  className="w-[65%] text-[1.2vw] font-roboto shadow appearance-none border rounded py-[0.25vw] text-gray-700 leading-tight focus:outline-colorStep focus:shadow-outline"
                  id="nascimento"
                  type="date"
                />
              </div>
              <div className="w-[40%] flex justify-between">
                <label
                  className="relative text-[1.2vw] font-roboto ml-[-0.5vw] py-[0.25vw]"
                  htmlFor="naturalidade"
                >
                  <span className="absolute left-[-1vw] text-red-500">*</span>
                  Naturalidade
                </label>
                <input
                  className="w-[82.5%] text-[1.2vw] font-roboto shadow appearance-none border rounded py-[0.25vw] text-gray-700 leading-tight focus:outline-colorStep focus:shadow-outline"
                  id="naturalidade"
                  type="text"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <div className="w-full flex justify-between">
                <label
                  className="relative text-[1.2vw] font-roboto ml-[-0.5vw] py-[0.25vw]"
                  htmlFor="filiacaoMae"
                >
                  <span className="absolute left-[-1vw] text-red-500">*</span>
                  Filiação - Mãe
                </label>
                <input
                  className="w-[82.5%] text-[1.2vw] font-roboto shadow appearance-none border rounded py-[0.25vw] text-gray-700 leading-tight focus:outline-colorStep focus:shadow-outline"
                  id="filiacaoMae"
                  type="text"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <div className="w-full flex justify-between">
                <label
                  className="text-[1.2vw] font-roboto ml-[-0.5vw] py-[0.25vw]"
                  htmlFor="filiacaoPai"
                >
                  Filiação - Pai
                </label>
                <input
                  className="w-[82.5%] text-[1.2vw] font-roboto shadow appearance-none border rounded py-[0.25vw] text-gray-700 leading-tight focus:outline-colorStep focus:shadow-outline"
                  id="filiacaoPai"
                  type="text"
                />
              </div>
            </div>
          </section>
        )}
        {
          /*Etapa 2 */
          page === 2 && (
            <section className="w-[90%] mx-auto flex flex-col gap-[2vw]">
              <div className="flex justify-between">
                <div className="w-[50%] flex justify-between">
                  <label
                    className="text-[1.2vw] font-roboto ml-[-0.5vw] py-[0.25vw]"
                    htmlFor="telefone01"
                  >
                    <span className="relative left-[-1vw] text-red-500 text-[1.2vw] font-roboto">
                      *
                    </span>
                    Telefone 01
                  </label>
                  <input
                    className="w-[65%] text-[1.2vw] font-roboto shadow appearance-none border rounded py-[0.25vw] text-gray-700 leading-tight focus:outline-colorStep focus:shadow-outline"
                    id="telefone01"
                    type="text"
                  />
                </div>
                <div className="w-[40%] flex justify-between">
                  <label
                    className="text-[1.2vw] font-roboto py-[0.25vw]"
                    htmlFor="telefone02"
                  >
                    Telefone 02
                  </label>
                  <input
                    className="w-[75%] text-[1.2vw] font-roboto shadow appearance-none border rounded py-[0.25vw] text-gray-700 leading-tight focus:outline-colorStep focus:shadow-outline"
                    id="telefone02"
                    type="text"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <div className="w-[50%] flex justify-between">
                  <label
                    className="text-[1.2vw] font-roboto ml-[-0.5vw] py-[0.25vw]"
                    htmlFor="cep"
                  >
                    <span className="relative left-[-1vw] text-red-500 text-[1.2vw] font-roboto">
                      *
                    </span>
                    CEP
                  </label>
                  <input
                    className="w-[65%] text-[1.2vw] font-roboto shadow appearance-none border rounded py-[0.25vw] text-gray-700 leading-tight focus:outline-colorStep focus:shadow-outline"
                    id="cep"
                    type="text"
                  />
                </div>
                <div className="w-[40%] flex justify-between">
                  <label
                    className="text-[1.2vw] ml-[-0.5vw] font-roboto py-[0.25vw]"
                    htmlFor="numero"
                  >
                    <span className="relative left-[-1vw] text-red-500 text-[1.2vw] font-roboto">
                      *
                    </span>
                    Número
                  </label>
                  <input
                    className="w-[75%] text-[1.2vw] font-roboto shadow appearance-none border rounded py-[0.25vw] text-gray-700 leading-tight focus:outline-colorStep focus:shadow-outline"
                    id="numero"
                    type="text"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <div className="w-full flex justify-between">
                  <label
                    className="text-[1.2vw] ml-[-0.5vw] font-roboto py-[0.25vw]"
                    htmlFor="endereco"
                  >
                    <span className="relative left-[-1vw] text-red-500 text-[1.2vw] font-roboto">
                      *
                    </span>
                    Endereço
                  </label>
                  <input
                    className="w-[82.5%]  text-[1.2vw] font-roboto shadow appearance-none border rounded py-[0.25vw] text-gray-700 leading-tight focus:outline-colorStep focus:shadow-outline"
                    id="endereco"
                    type="text"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <div className="w-full flex justify-between">
                  <label
                    className="text-[1.2vw] ml-[-0.5vw] font-roboto py-[0.25vw]"
                    htmlFor="bairro"
                  >
                    <span className="relative left-[-1vw] text-red-500 text-[1.2vw] font-roboto">
                      *
                    </span>
                    Bairro
                  </label>
                  <input
                    className="w-[82.5%]  text-[1.2vw] font-roboto shadow appearance-none border rounded py-[0.25vw] text-gray-700 leading-tight focus:outline-colorStep focus:shadow-outline"
                    id="bairro"
                    type="text"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <div className="w-[50%] flex justify-between">
                  <label
                    className="text-[1.2vw] ml-[-0.5vw] font-roboto py-[0.25vw]"
                    htmlFor="cidade"
                  >
                    <span className="relative left-[-1vw] text-red-500 text-[1.2vw] font-roboto">
                      *
                    </span>
                    Cidade
                  </label>
                  <input
                    className="w-[65%] text-[1.2vw] font-roboto shadow appearance-none border rounded py-[0.25vw] text-gray-700 leading-tight focus:outline-colorStep focus:shadow-outline"
                    id="cidade"
                    type="text"
                  />
                </div>
                <div className="w-[40%] flex justify-between">
                  <label
                    className="text-[1.2vw] ml-[-0.5vw] font-roboto py-[0.25vw]"
                    htmlFor="estado"
                  >
                    <span className="relative left-[-1vw] text-red-500 text-[1.2vw] font-roboto">
                      *
                    </span>
                    Estado
                  </label>
                  <input
                    className="w-[82.5%]  text-[1.2vw] font-roboto shadow appearance-none border rounded py-[0.25vw] text-gray-700 leading-tight focus:outline-colorStep focus:shadow-outline"
                    id="estado"
                    type="text"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <div className="w-full flex justify-between">
                  <label
                    className="text-[1.2vw] font-roboto py-[0.25vw]"
                    htmlFor="complemento"
                  >
                    Complemento
                  </label>
                  <input
                    className="w-[82.5%]  text-[1.2vw] font-roboto shadow appearance-none border rounded py-[0.25vw] text-gray-700 leading-tight focus:outline-colorStep focus:shadow-outline"
                    id="complemento"
                    type="text"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <div className="w-full flex justify-between">
                  <label
                    className="text-[1.2vw] ml-[-0.5vw] font-roboto py-[0.25vw]"
                    htmlFor="email"
                  >
                    <span className="relative left-[-1vw] text-red-500 text-[1.2vw] font-roboto">
                      *
                    </span>
                    E-mail
                  </label>
                  <input
                    className="w-[82.5%]  text-[1.2vw] font-roboto shadow appearance-none border rounded py-[0.25vw] text-gray-700 leading-tight focus:outline-colorStep focus:shadow-outline"
                    id="email"
                    type="email"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <div className="w-full flex justify-between">
                  <label
                    className="text-[1.2vw] font-roboto py-[0.25vw]"
                    htmlFor="instagram"
                  >
                    Instagram
                  </label>
                  <input
                    className="w-[82.5%] text-[1.2vw] font-roboto shadow appearance-none border rounded py-[0.25vw] text-gray-700 leading-tight focus:outline-colorStep focus:shadow-outline"
                    id="instagram"
                    type="text"
                  />
                </div>
              </div>
            </section>
          )
        }
        {/* Etapa 3 */}
        {page === 3 && (
          <section className="w-[90%] mx-auto flex flex-col gap-[2vw]">
            <div className="flex justify-between">
              <div className="w-full flex justify-between">
                <label
                  className="relative text-[1.2vw] font-roboto ml-[-0.5vw] py-[0.25vw]"
                  htmlFor="religiao"
                >
                  <span className="absolute left-[-1vw] text-red-500">*</span>
                  Religião
                </label>
                <input
                  className="w-[82.5%] text-[1.2vw] font-roboto shadow appearance-none border rounded py-[0.25vw] text-gray-700 leading-tight focus:outline-colorStep focus:shadow-outline"
                  id="religiao"
                  type="text"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="w-full flex justify-between">
                <label
                  className="relative text-[1.2vw] font-roboto ml-[-0.5vw] py-[0.25vw]"
                  htmlFor="paroquia"
                >
                  <span className="absolute left-[-1vw] text-red-500">*</span>
                  Paróquia
                </label>
                <input
                  className="w-[82.5%] text-[1.2vw] font-roboto shadow appearance-none border rounded py-[0.25vw] text-gray-700 leading-tight focus:outline-colorStep focus:shadow-outline"
                  id="paroquia"
                  type="text"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="w-full flex justify-between">
                <label
                  className="relative text-[1.2vw] font-roboto ml-[-0.5vw] py-[0.25vw]"
                  htmlFor="igreja"
                >
                  <span className="absolute left-[-1vw] text-red-500">*</span>
                  Igreja que Frequenta
                </label>
                <input
                  className="w-[82.5%] text-[1.2vw] font-roboto shadow appearance-none border rounded py-[0.25vw] text-gray-700 leading-tight focus:outline-colorStep focus:shadow-outline"
                  id="igreja"
                  type="text"
                />
              </div>
            </div>
            <div className="flex flex-row justify-between items-center">
              <label className="text-[1.2vw] font-roboto py-[0.25vw] w-fit">
                Sacramento
              </label>
              <span className="absolute left-[-1vw] text-red-500">*</span>
              <div className="flex justify-between w-[82.5%] pr-[30%] items-center">
                <label
                  className="text-[1.2vw] font-roboto py-[0.25vw]"
                  htmlFor="batismo"
                >
                  <input
                    type="checkbox"
                    id="batismo"
                    className="mr-[1vw] w-[4vw] h-[4vw] align-middle text-[#24CD68]"
                  />
                  Batismo
                </label>
                <label
                  className="text-[1.2vw] font-roboto py-[0.25vw]"
                  htmlFor="eucaristia"
                >
                  <input
                    type="checkbox"
                    id="eucaristia"
                    className="mr-[1vw] w-[4vw] h-[4vw] align-middle"
                  />
                  Eucaristia
                </label>
                <label
                  className="text-[1.2vw] font-roboto py-[0.25vw]"
                  htmlFor="crisma"
                >
                  <input
                    type="checkbox"
                    id="crisma"
                    className="mr-[1vw] w-[4vw] h-[4vw] align-middle"
                  />
                  Crisma
                </label>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <label className="text-[1.2vw] font-roboto py-[0.25vw]">
                Os pais participararm do ECC (Encontro de Casais com Cristo)
              </label>
              <span className="absolute left-[-1vw] text-red-500">*</span>
              <div className="flex justify-between pl-[17.5%] pr-[55%]">
                <label
                  className="text-[1.2vw] font-roboto py-[0.25vw]"
                  htmlFor="sim"
                >
                  <input
                    type="radio"
                    id="sim"
                    name="ecc"
                    className="mr-[1vw] w-[4vw] h-[4vw] align-middle"
                  />
                  Sim
                </label>
                <label
                  className="text-[1.2vw] font-roboto py-[0.25vw]"
                  htmlFor="nao"
                >
                  <input
                    type="radio"
                    id="nao"
                    name="ecc"
                    className="mr-[1vw] w-[4vw] h-[4vw] align-middle"
                  />
                  Não
                </label>
              </div>
            </div>

            <div className="flex justify-between text-[1.2vw] flex-col gap-[2vw]">
              Quem o convidou para o Retiro?
              <div className="w-full flex justify-between">
                <label
                  className="text-[1.2vw] font-roboto ml-[-0.5vw] py-[0.25vw]"
                  htmlFor="quem-convidou"
                >
                  Nome:
                </label>
                <input
                  className="w-[82.5%] text-[1.2vw] font-roboto shadow appearance-none border rounded py-[0.25vw] text-gray-700 leading-tight focus:outline-colorStep focus:shadow-outline"
                  id="quem-convidou"
                  type="text"
                />
              </div>
            </div>
          </section>
        )}
        {
          /* Etapa 4 */
          page === 4 && (
            <section className="w-[90%] mx-auto flex flex-col gap-[2vw]">
              <div className="flex justify-between">
                <div className="w-full flex justify-between">
                  <label
                    className="relative text-[1.2vw] font-roboto ml-[-0.5vw] py-[0.25vw]"
                    htmlFor="escolaridade"
                  >
                    <span className="absolute left-[-1vw] text-red-500">*</span>
                    Escolaridade
                  </label>
                  <input
                    className="w-[82.5%] text-[1.2vw] font-roboto shadow appearance-none border rounded py-[0.25vw] text-gray-700 leading-tight focus:outline-colorStep focus:shadow-outline"
                    id="escolaridade"
                    type="text"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <div className="w-full flex justify-between">
                  <label
                    className="text-[1.2vw] font-roboto ml-[-0.5vw] py-[0.25vw]"
                    htmlFor="situacao"
                  >
                    Situação
                  </label>
                  <input
                    className="w-[82.5%] text-[1.2vw] font-roboto shadow appearance-none border rounded py-[0.25vw] text-gray-700 leading-tight focus:outline-colorStep focus:shadow-outline"
                    id="situacao"
                    type="text"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <div className="w-full flex justify-between">
                  <label
                    className="text-[1.2vw] font-roboto ml-[-0.5vw] py-[0.25vw]"
                    htmlFor="curso"
                  >
                    Curso
                  </label>
                  <input
                    className="w-[82.5%] text-[1.2vw] font-roboto shadow appearance-none border rounded py-[0.25vw] text-gray-700 leading-tight focus:outline-colorStep focus:shadow-outline"
                    id="curso"
                    type="text"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <div className="w-full flex justify-between">
                  <label
                    className="text-[1.2vw] font-roboto ml-[-0.5vw] py-[0.25vw]"
                    htmlFor="instituicao"
                  >
                    Instituição
                  </label>
                  <input
                    className="w-[82.5%] text-[1.2vw] font-roboto shadow appearance-none border rounded py-[0.25vw] text-gray-700 leading-tight focus:outline-colorStep focus:shadow-outline"
                    id="instituicao"
                    type="text"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <div className="w-full flex justify-between">
                  <label
                    className="text-[1.2vw] font-roboto ml-[-0.5vw] py-[0.25vw]"
                    htmlFor="observacao"
                  >
                    Observação
                  </label>
                  <textarea
                    className="w-[82.5%] text-[1.2vw] font-roboto shadow appearance-none border rounded py-[0.25vw] text-gray-700 leading-tight focus:outline-colorStep focus:shadow-outline"
                    id="observacao"
                    maxLength={200}
                    rows={4}
                  />
                </div>
              </div>
              {/*TODO: Fazer a estilização correta desse botão */}
              <div className="flex justify-between">
                <div className="w-full flex gap-[15%]">
                  <label
                    className="text-[1.2vw] font-roboto ml-[-0.5vw] py-[0.25vw]"
                    htmlFor="foto"
                  >
                    Foto
                  </label>
                  <input
                    className="w-[20%] text-[1.2vw] font-roboto shadow appearance-none border rounded py-[0.25vw] text-gray-700 leading-tight focus:outline-colorStep focus:shadow-outline"
                    id="foto"
                    type="file"
                  />
                </div>
              </div>
            </section>
          )
        }
      </form>
      <div className="w-[25vw] flex flec-row justify-between mx-auto">
        {handleButtonRender()}
      </div>
    </main>
  );
}
