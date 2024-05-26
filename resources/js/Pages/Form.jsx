import Header from "../Components/Header";
import { useCallback } from "react";
import * as yup from "yup";
import dayjs from "dayjs";

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
       
            data: yup.dayjs("cu"),

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
    const resolver = useYupValidationResolver(FormSchema);
    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useForm({ resolver, mode: "onChange" });
    const onSubmit = () => console.log(data);
    console.log({ errors });
    return (
        <main className="">
            <Header />
        </main>
    );
}
