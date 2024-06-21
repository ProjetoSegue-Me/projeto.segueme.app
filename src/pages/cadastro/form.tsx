import { useCallback, useState } from "react";
import * as yup from "yup";
import Header from "@/components/Header";
import Titulo from "@/components/Titulo";
import { useRouter } from "next/router";

//Função de buscar membro
const fetchMemberById = async (memberId: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/members/getById?id=${memberId}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return null;
  }
};

//Busca o membro caso tenha uma query
export async function getServerSideProps(query: any) {
  const { id } = query.query;
  console.log(`Server-side fetch for member ID: ${id}`);

  const memberData = await fetchMemberById(id);
  return {
    props: { memberData },
  };
}

export default function Form({ memberData }: any) {
  const router = useRouter();
  const [page, setPage] = useState(1);

  //Buffer Received Image
  const bufferImage = (bufferData: any) => {
    const imageBase64 = Buffer.from(bufferData.data).toString("base64");
    return imageBase64;
  };

  //Retorna o valor no formato correto caso a data tenha sido buscada
  const parseDate = (dateString: any) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  //Valores a serem enviados
  const [formValues, setFormValues] = useState(() => {
    if (memberData) {
      return {
        idPessoa: memberData.idPessoa,
        NomeCompleto: memberData.NomeCompleto || "",
        Email: memberData.Email || "",
        Instagram: memberData.Instagram || "",
        DtNascimento: parseDate(memberData.DtNascimento) || "",
        NomeMae: memberData.NomeMae || "",
        NomePai: memberData.NomePai || "",
        EstadoCivil: memberData.EstadoCivil || "",
        Paroquia: memberData.Paroquia || "",
        Sacramento: memberData.Sacramento || "",
        Conjuge: memberData.Conjuge || "",
        Naturalidade: memberData.Naturalidade || "",
        Religiao: memberData.Religiao || "",
        IgrejaFrequenta: memberData.IgrejaFrequenta || "",
        ECC: memberData.ECC || 0,
        Observacao: memberData.Observacao || "",
        foto: bufferImage(memberData.foto) || "",
        telefones: memberData.telefone || [{ Numero: "" }],
        escolaridade: {
          idEscola: memberData.escolaridade[0]?.idEscola || "",
          EscolaridadeCategoria:
            memberData.escolaridade[0]?.EscolaridadeCategoria || "",
          Instituicao: memberData.escolaridade[0]?.Instituicao || "",
          Curso: memberData.escolaridade[0]?.Curso || "",
          Situacao: memberData.escolaridade[0]?.Situacao || "",
        },
        endereco: {
          idEndereco: memberData.endereco[0]?.idEndereco || "",
          Rua: memberData.endereco[0]?.Rua || "",
          Numero: memberData.endereco[0]?.Numero || "",
          Complemento: memberData.endereco[0]?.Complemento || "",
          Bairro: memberData.endereco[0]?.Bairro || "",
          Cidade: memberData.endereco[0]?.Cidade || "",
          Estado: memberData.endereco[0]?.Estado || "",
          Cep: memberData.endereco[0]?.Cep || "",
        },
      };
    } else {
      return {
        NomeCompleto: "",
        Email: "",
        Instagram: "",
        DtNascimento: "",
        NomeMae: "",
        NomePai: "",
        EstadoCivil: "",
        Paroquia: "",
        Sacramento: "",
        Conjuge: "",
        Naturalidade: "",
        Religiao: "",
        IgrejaFrequenta: "",
        ECC: 0,
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
      };
    }
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
  
  function formatPhoneNumber(value: string) {
    if (!value) return value;
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
    if (match) {
      let formatted = "";
      if (match[1]) formatted += `(${match[1]}`;
      if (match[2]) formatted += `) ${match[2]}`;
      if (match[3]) formatted += `-${match[3]}`;
      return formatted;
    }

    return value;
  }
  function formatCEP(value: string) {
    if (!value) return value;
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,5})(\d{0,3})$/);
    if (match) {
      let formatted = "";
      if (match[1]) formatted += `${match[1]}`;
      if (match[2]) formatted += `-${match[2]}`;
      return formatted;
    }

    return value;
  }

  //Definição do Yup validator
  const schema = yup.object().shape({
    NomeCompleto: yup
      .string()
      .max(100, "Nome Completo deve ter no máximo 100 caracteres")
      .required("Nome Completo é um campo obrigatório"),
    Email: yup
      .string()
      .email("Email inválido")
      .max(45, "Email deve ter no máximo 45 caracteres")
      .nullable(),
    Instagram: yup
      .string()
      .matches(/^@/, "Instagram deve começar com @")
      .max(45, "Instagram deve ter no máximo 45 caracteres")
      .nullable(),
    DtNascimento: yup.date().required("DtNascimento é um campo obrigatório"),
    NomeMae: yup
      .string()
      .max(60, "Nome Mae deve ter no máximo 60 caracteres")
      .required("Nome Mae é um campo obrigatório"),
    NomePai: yup
      .string()
      .max(60, "Nome Pai deve ter no máximo 60 caracteres")
      .nullable(),
    EstadoCivil: yup
      .string()
      .max(10, "Estado Civil deve ter no máximo 10 caracteres")
      .nullable(),
    Paroquia: yup
      .string()
      .max(45, "Paroquia deve ter no máximo 45 caracteres")
      .required("Paroquia é um campo obrigatório"),
    Sacramento: yup
      .string()
      .max(45, "Sacramento deve ter no máximo 45 caracteres")
      .required("Sacramento é um campo obrigatório"),
    Conjuge: yup
      .string()
      .max(100, "Conjuge deve ter no máximo 100 caracteres")
      .nullable(),
    Naturalidade: yup
      .string()
      .max(45, "Naturalidade deve ter no máximo 45 caracteres")
      .required("Naturalidade é um campo obrigatório"),
    Religiao: yup
      .string()
      .max(45, "Religiao deve ter no máximo 45 caracteres")
      .required("Religiao é um campo obrigatório"),
    IgrejaFrequenta: yup
      .string()
      .max(90, "IgrejaFrequenta deve ter no máximo 90 caracteres")
      .required("IgrejaFrequenta é um campo obrigatório"),
    ECC: yup
      .number()
      .integer("Tipo invalido")
      .max(32767, "Valor invalido")
      .required("ECC é um campo obrigatório"),
    Observacao: yup
      .string()
      .max(200, "Observação deve ter no máximo 200 caracteres")
      .nullable(),
    foto: yup.mixed().nullable(),
    telefones: yup
      .array()
      .of(
        yup.object().shape({
          Numero: yup
            .string()
            .matches(/^\d{11}$/, "Número deve ter 11 dígitos")
            .nullable(),
        })
      )
      .test("at-least-one", "Campo Obrigatório", function (telefones) {
        if (telefones && telefones.length > 0) {
          return !!telefones[0].Numero;
        }
        return false;
      }),
    escolaridade: yup.object().shape({
      EscolaridadeCategoria: yup
        .string()
        .max(45, "EscolaridadeCategoria deve ter no máximo 45 caracteres")
        .required("EscolaridadeCategoria é um campo obrigatório"),
      Instituicao: yup
        .string()
        .max(60, "Instituicao deve ter no máximo 60 caracteres")
        .nullable(),
      Curso: yup
        .string()
        .max(60, "Curso deve ter no máximo 60 caracteres")
        .nullable(),
      Situacao: yup
        .string()
        .max(45, "Situacao deve ter no máximo 45 caracteres")
        .nullable(),
    }),
    endereco: yup.object().shape({
      Rua: yup
        .string()
        .max(60, "Rua deve ter no máximo 60 caracteres")
        .required("Rua é um campo obrigatório"),
      Numero: yup
        .string()
        .max(10, "Numero deve ter no máximo 10 caracteres")
        .required("Numero é um campo obrigatório"),
      Complemento: yup
        .string()
        .max(60, "Complemento deve ter no máximo 60 caracteres")
        .nullable(),
      Bairro: yup
        .string()
        .max(45, "Bairro deve ter no máximo 45 caracteres")
        .required("Bairro é um campo obrigatório"),
      Cidade: yup
        .string()
        .max(45, "Cidade deve ter no máximo 45 caracteres")
        .required("Cidade é um campo obrigatório"),
      Estado: yup
        .string()
        .max(45, "Estado deve ter no máximo 45 caracteres")
        .required("Estado é um campo obrigatório"),
      Cep: yup
        .string()
        .matches(/^\d{8}$/, "Cep deve ter 8 dígitos")
        .required("Cep é um campo obrigatório"),
    }),
  });
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
    console.log(formValues);
  };

  const handleBack = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleReset = () => {
    setPage(1);
  };

  //Mudança das caixas de input

  const handleChange = async (e: any) => {
    const { name, files, value, type, checked } = e.target;

    if (type === "checkbox") {
      let sacramentoArray = formValues.Sacramento.split(", ").filter(Boolean);

      if (checked) {
        sacramentoArray.push(name);
      } else {
        sacramentoArray = sacramentoArray.filter((sac: string) => sac !== name);
      }
      const sacramentoOrder = ["Batismo", "Eucaristia", "Crisma"];
      sacramentoArray = sacramentoArray.sort(
        (a: any, b: any) =>
          sacramentoOrder.indexOf(a) - sacramentoOrder.indexOf(b)
      );

      const sacramentoString = sacramentoArray.join(", ").slice(0, 45);
      setFormValues((prevState: any) => ({
        ...prevState,
        Sacramento: sacramentoString,
      }));
    } else if (name.startsWith("telefone")) {
      const index = parseInt(name.slice(-2)) - 1;
      const input = e.target.value.replace(/\D/g, "");

      const updatedTelefones = [...formValues.telefones];
      updatedTelefones[index] = { Numero: input };
      setFormValues({ ...formValues, telefones: updatedTelefones });
    } else if (name.startsWith("endereco")) {
      const field = name.split("-")[1];
      setFormValues({
        ...formValues,
        endereco: {
          ...formValues.endereco,
          [field]: value,
        },
      });
    } else if (name.startsWith("escolaridade")) {
      const field = name.split("-")[1];
      setFormValues({
        ...formValues,
        escolaridade: {
          ...formValues.escolaridade,
          [field]: value,
        },
      });
    } else if (name === "ecc") {
      setFormValues({ ...formValues, ECC: value === "Sim" ? 1 : 0 });
    } else if (name === "foto" && files?.length) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          const base64String = reader.result.split(",")[1];
          setFormValues({ ...formValues, foto: base64String });
        }
      };

      reader.readAsDataURL(file);
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
    if (name.startsWith("endereco")) {
      const field = name.split("-")[1];
      const cleanedValue = field === "Cep" ? value.replace(/\D/g, "") : value;
      setFormValues((prevState: any) => ({
        ...prevState,
        endereco: {
          ...prevState.endereco,
          [field]: cleanedValue,
        },
      }));
      if (field === "Cep" && cleanedValue.length === 8) {
        try {
          const response = await fetch(
            `https://viacep.com.br/ws/${cleanedValue}/json/`
          );
          if (response.ok) {
            const data = await response.json();
            if (!data.erro) {
              setFormValues((prevState: any) => ({
                ...prevState,
                endereco: {
                  ...prevState.endereco,
                  Rua: data.logradouro || "",
                  Bairro: data.bairro || "",
                  Cidade: data.localidade || "",
                  Estado: data.uf || "",
                },
              }));
            }
          }
        } catch (error) {
          console.error("Error fetching address:", error);
        }
      }
    }
  };

  //Botão enviar
  const handleSubmit = async () => {
    try {
      const url = memberData ? "/api/members/update" : "/api/members/create";
      const method = memberData ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        console.log(
          memberData
            ? "Pessoa atualizada com sucesso!"
            : "Pessoa cadastrada com sucesso!"
        );
        router.push("/cadastro");
      } else {
        console.error(
          memberData
            ? "Erro ao atualizar pessoa:"
            : "Erro ao cadastrar pessoa:",
          response.statusText
        );
        router.push({
          pathname: "/erro",
          query: {
            message: memberData
              ? "Erro ao atualizar pessoa"
              : "Erro ao cadastrar pessoa",
          },
        });
      }
    } catch (error: any) {
      console.error("Erro ao realizar requisição:", error.message);
      router.push({
        pathname: "/erro",
        query: { message: "Erro ao realizar requisição" },
      });
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
                  id="NomeCompleto"
                  name="NomeCompleto"
                  type="text"
                  value={formValues.NomeCompleto}
                  onChange={handleChange}
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
                  id="Conjuge"
                  name="Conjuge"
                  type="text"
                  value={formValues.Conjuge}
                  onChange={handleChange}
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
                  id="DtNascimento"
                  name="DtNascimento"
                  type="date"
                  value={formValues.DtNascimento}
                  onChange={handleChange}
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
                  id="Naturalidade"
                  name="Naturalidade"
                  type="text"
                  value={formValues.Naturalidade}
                  onChange={handleChange}
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
                  id="NomeMae"
                  name="NomeMae"
                  type="text"
                  value={formValues.NomeMae}
                  onChange={handleChange}
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
                  id="NomePai"
                  name="NomePai"
                  type="text"
                  value={formValues.NomePai}
                  onChange={handleChange}
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
                    name="telefone01"
                    value={formatPhoneNumber(formValues.telefones[0].Numero)}
                    onChange={handleChange}
                    maxLength={15}
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
                    name="telefone02"
                    value={
                      formValues.telefones[1]
                        ? formatPhoneNumber(formValues.telefones[1].Numero)
                        : ""
                    }
                    onChange={handleChange}
                    maxLength={15}
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
                    name="endereco-Cep"
                    value={formatCEP(formValues.endereco.Cep)}
                    onChange={handleChange}
                    maxLength={9}
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
                    name="endereco-Numero"
                    value={formValues.endereco.Numero}
                    onChange={handleChange}
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
                    className="w-[82.5%] text-[1.2vw] font-roboto shadow appearance-none border rounded py-[0.25vw] text-gray-700 leading-tight focus:outline-colorStep focus:shadow-outline"
                    id="endereco"
                    type="text"
                    name="endereco-Rua"
                    value={formValues.endereco.Rua}
                    onChange={handleChange}
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
                    className="w-[82.5%] text-[1.2vw] font-roboto shadow appearance-none border rounded py-[0.25vw] text-gray-700 leading-tight focus:outline-colorStep focus:shadow-outline"
                    id="bairro"
                    type="text"
                    name="endereco-Bairro"
                    value={formValues.endereco.Bairro}
                    onChange={handleChange}
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
                    name="endereco-Cidade"
                    value={formValues.endereco.Cidade}
                    onChange={handleChange}
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
                    className="w-[82.5%] text-[1.2vw] font-roboto shadow appearance-none border rounded py-[0.25vw] text-gray-700 leading-tight focus:outline-colorStep focus:shadow-outline"
                    id="estado"
                    type="text"
                    name="endereco-Estado"
                    value={formValues.endereco.Estado}
                    onChange={handleChange}
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
                    className="w-[82.5%] text-[1.2vw] font-roboto shadow appearance-none border rounded py-[0.25vw] text-gray-700 leading-tight focus:outline-colorStep focus:shadow-outline"
                    id="complemento"
                    type="text"
                    name="endereco-Complemento"
                    value={formValues.endereco.Complemento}
                    onChange={handleChange}
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
                    id="Email"
                    name="Email"
                    type="email"
                    value={formValues.Email}
                    onChange={handleChange}
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
                    id="Instagram"
                    name="Instagram"
                    type="text"
                    value={formValues.Instagram}
                    onChange={handleChange}
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
                  id="Religiao"
                  name="Religiao"
                  type="text"
                  value={formValues.Religiao}
                  onChange={handleChange}
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
                  id="Paroquia"
                  name="Paroquia"
                  type="text"
                  value={formValues.Paroquia}
                  onChange={handleChange}
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
                  id="IgrejaFrequenta"
                  name="IgrejaFrequenta"
                  type="text"
                  value={formValues.IgrejaFrequenta}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-row justify-between items-center">
              <label className="relative text-[1.2vw] font-roboto py-[0.25vw] w-fit ml-[-0.5vw]">
                Sacramento
              </label>

              <div className="flex justify-between w-[82.5%] pr-[30%] items-center">
                <label
                  className="text-[1.2vw] font-roboto py-[0.25vw]"
                  htmlFor="batismo"
                >
                  <input
                    type="checkbox"
                    id="batismo"
                    name="Batismo"
                    className="mr-[1vw] w-[4vw] h-[4vw] align-middle text-[#24CD68]"
                    onChange={handleChange}
                    checked={formValues.Sacramento.includes("Batismo")}
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
                    name="Eucaristia"
                    className="mr-[1vw] w-[4vw] h-[4vw] align-middle"
                    onChange={handleChange}
                    checked={formValues.Sacramento.includes("Eucaristia")}
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
                    name="Crisma"
                    className="mr-[1vw] w-[4vw] h-[4vw] align-middle"
                    onChange={handleChange}
                    checked={formValues.Sacramento.includes("Crisma")}
                  />
                  Crisma
                </label>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <label className="relative text-[1.2vw] font-roboto py-[0.25vw] ml-[-0.5vw]">
                Os pais participaram do ECC (Encontro de Casais com Cristo)
              </label>

              <div className="flex justify-between pl-[17.5%] pr-[55%]">
                <label
                  className="text-[1.2vw] font-roboto py-[0.25vw]"
                  htmlFor="sim"
                >
                  <input
                    type="radio"
                    id="sim"
                    name="ecc"
                    value="Sim"
                    className="mr-[1vw] w-[4vw] h-[4vw] align-middle"
                    onChange={handleChange}
                    checked={formValues.ECC === 1}
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
                    value="Não"
                    className="mr-[1vw] w-[4vw] h-[4vw] align-middle"
                    onChange={handleChange}
                    checked={formValues.ECC === 0}
                  />
                  Não
                </label>
              </div>
            </div>

            <div className="flex justify-between text-[1.2vw] flex-col gap-[2vw] ml-[-0.5vw]">
              Quem o convidou para o Retiro?
              <div className="w-full flex justify-between">
                <label
                  className="text-[1.2vw] font-roboto py-[0.25vw] "
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
              <div className="w-full flex justify-between">
                <label
                  className="relative text-[1.2vw] font-roboto ml-[-0.5vw] py-[0.25vw]"
                  htmlFor="escolaridade"
                >
                  <span className="absolute left-[-1vw] text-red-500">*</span>
                  Escolaridade
                </label>
                <select
                  className="w-[82.5%] text-[1.2vw] font-roboto shadow appearance-none border rounded py-[0.25vw] text-gray-700 leading-tight focus:outline-colorStep focus:shadow-outline"
                  id="escolaridade"
                  name="escolaridade-EscolaridadeCategoria"
                  onChange={handleChange}
                  value={formValues.escolaridade.EscolaridadeCategoria}
                >
                  <option value="">Selecione uma opção</option>
                  <option value="Fundamental - Incompleto">
                    Fundamental - Incompleto
                  </option>
                  <option value="Fundamental - Completo">
                    Fundamental - Completo
                  </option>
                  <option value="Médio - Incompleto">Médio - Incompleto</option>
                  <option value="Médio - Completo">Médio - Completo</option>
                  <option value="Superior - Incompleto">
                    Superior - Incompleto
                  </option>
                  <option value="Superior - Completo">
                    Superior - Completo
                  </option>
                  <option value="Pós-graduação - Incompleto">
                    Pós-graduação - Incompleto
                  </option>
                  <option value="Pós-graduação - Completo">
                    Pós-graduação - Completo
                  </option>
                  <option value="Mestrado - Incompleto">
                    Mestrado - Incompleto
                  </option>
                  <option value="Mestrado - Completo">
                    Mestrado - Completo
                  </option>
                  <option value="Doutorado - Incompleto">
                    Doutorado - Incompleto
                  </option>
                  <option value="Doutorado - Completo">
                    Doutorado - Completo
                  </option>
                </select>
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
                    name="escolaridade-Situacao"
                    onChange={handleChange}
                    value={formValues.escolaridade.Situacao}
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
                    name="escolaridade-Curso"
                    onChange={handleChange}
                    value={formValues.escolaridade.Curso}
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
                    name="escolaridade-Instituicao"
                    onChange={handleChange}
                    value={formValues.escolaridade.Instituicao}
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
                    id="Observacao"
                    name="Observacao"
                    value={formValues.Observacao}
                    onChange={handleChange}
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
                  {formValues.foto && (
                    <div>
                      <img
                        src={`data:image/jpeg;base64,${formValues.foto}`}
                        alt="Uploaded"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "200px",
                          marginTop: "10px",
                        }}
                      />
                    </div>
                  )}
                  <input
                    className="w-[20%] text-[1.2vw] font-roboto shadow appearance-none border rounded py-[0.25vw] text-gray-700 leading-tight focus:outline-colorStep focus:shadow-outline"
                    id="foto"
                    type="file"
                    name="foto"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>
          )
        }
      </form>
      <div className="w-[25vw] pb-[4vw] flex flec-row justify-between mx-auto">
        {handleButtonRender()}
      </div>
    </main>
  );
}
