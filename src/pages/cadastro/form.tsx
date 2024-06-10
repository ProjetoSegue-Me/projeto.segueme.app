import { useCallback } from "react";
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

{
    /* FormSchema do yup */
}

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

export default function Form() {


    return (
        <main className="bg-bodyColor min-h-screen">
            <Header />
            <div className="mt-[2vw]">
                <Titulo conteudo="Cadastro - Dados Pessoais" />
            </div>
            <div className="h-[4vw] w-[90vw] mx-auto flex justify-start py-[0.75vw] mt-[2vw]">
               <div className="bg-colorStep px-[1vw] py-[1vw] rounded-full text-center pt-[0.3vw] text-[1.2vw] mx-auto">1</div>

                <span className=" w-[2vw] h-[4px] bg-colorStep "></span>
            </div>
        </main>
    );
}
