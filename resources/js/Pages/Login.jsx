import { useCallback, useState } from "react";
import * as yup from "yup";
import { router } from "@inertiajs/react";
import Header from "../Components/Header";

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
const FormSchema = yup
    .object({
        login: yup.string().required("Este campo é obrigatório."),
        senha: yup.string().required("Este campo é obrigatório."),
    })
    .required();

export default function Login() {
    const [values, setValues] = useState({
        login: "",
        senha: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await FormSchema.validate(values, { abortEarly: false });
        setErrors({});
        router.post("/Login", values);
    };

    return (
        //Caso começe a quebrar em medias maiores, pedir pelo fundo como imagem
        <div className=" bg-loginfundo w-screen bg-no-repeat bg-contain text-[1.2vw] font-roboto overflow-hidden">
            <div className=" bg-gradient-to-r from-[#F9CDA353] to-bodyColor min-h-screen to-[50%]  z-10">
                <Header></Header>
                <form
                    onSubmit={handleSubmit}
                    className="ml-auto w-[25vw] mr-[15vw] mt-[25vh]"
                >
                    <div className="relative mt-2 w-[100%]">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <img
                                src="/images/User.png"
                                className="ml-[1vw] w-[1vw]"
                            />
                        </div>
                        <input
                            type="text"
                            name="login"
                            id="login"
                            className="block ml-[1vw] w-full border-0 py-1.5 pl-[10%] pr-20 text-gray-900 ring-1 ring-inset ring-[#FFB718] placeholder:text-gray-400"
                            placeholder="Úsuario"
                            value={values.login}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="relative mt-2 w-[100%] text-[1.2vw]">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <img
                                src="/images/Senha.png"
                                className="ml-[1vw] w-[1vw]"
                            />
                        </div>
                        <input
                            type="password"
                            name="senha"
                            id="senha"
                            className="block ml-[1vw] w-full border-0 py-1.5 pl-[10%] pr-20 text-gray-900 ring-1 ring-inset ring-[#FFB718] placeholder:text-gray-400"
                            placeholder="Senha"
                            value={values.senha}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className=" ml-[70%] w-fit text-[1.2vw] font-roboto bg-[#FFB718] mt-[5vh] rounded-full px-[2.5vw] py-[0.75vw] "
                    >
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    );
}
