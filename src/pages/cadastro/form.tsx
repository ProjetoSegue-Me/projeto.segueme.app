import { useCallback, useState } from "react";
import * as yup from "yup";
import dayjs from "dayjs";
import Header from "@/components/Header";
import Titulo from "@/components/Titulo";

{
  /*Form usando Inertia e yup */
}

{
  /*validação do yup usando yup Resolver*/
}
/*
yup.addMethod(yup.object, "dayjs", function method(message) {
  return this.test("dayjs", message, function validate(value) {
    const dayjsValue = dayjs(value, "DD/MM/YYYY");
    if (!value) {
      return true;
    }
    return dayjs.isDayjs(dayjsValue);
  });
});

const useYupValidationResolver = () =>
  useCallback(async () => {
    try {
      const values = await FormSchema.validate(data, {
        abortEarly: false,
      });
      return {
        values,
        errors: {},
      };
    } catch {
      return {
        values: {},
        errors: errors.inner.reduce(
          () => ({
            ...allErrors,
            [currentError.path]: {
              type: currentError.type ?? "validation",
              message: currentError.message,
            },
          }),
          {}
        ),
      };
    }
  }, [FormSchema]);
*/
{
  /* FormSchema do yup */
}
/*
const FormSchema = yup
  .object({
    jovemCasalFichas: yup
      .string()
      .min(3, "Primeiro nome deve conter no mínimo 3 letras.")
      .required("Este campo é obrigatório."),

    data: yup.object().dayjs("teste"),

    nomeCompleto: yup
      .string()
      .min(3, "O nome deve conter no mínimo 3 letras.")
      .required("Este campo é obrigatório."),
    conjuge: yup
      .string()
      .min(3, "O nome do cônjuge deve conter no mínimo 3 letras.")
      .required("Este campo é obrigatório."),
    naturalidade: yup
      .string()
      .min(3, "O nome do local deve conter no mínimo 3 letras.")
      .required("Este campo é obrigatório."),
    filiacaoPai: yup
      .string()
      .min(3, "O nome do pai deve conter no mínimo 3 letras.")
      .required("Este campo é obrigatório."),
    filiacaoMae: yup
      .string()
      .min(3, "O nome da mãe deve conter no mínimo 3 letras.")
      .required("Este campo é obrigatório."),
  })
  .required();
  */
export default function Form() {
  const [page, setPage] = useState(1);

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
        return <Titulo conteudo="Cadastro - Dados Pessoais"/>;

      case 2:
        return <Titulo conteudo="Cadastro - Contato"/>;

      case 3:
        return <Titulo conteudo="Cadastro - Dados Religiosos"/>;

      case 4:
        return <Titulo conteudo="Cadastro - Dados Diversos"/>;

      default:
        break;
    }
  };
  
  return (
    <main className="bg-bodyColor min-h-screen">
      <Header />
      <div className="mt-[2vw]">
        {handlePageName()}
      </div>

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
    </main>
  );
}
