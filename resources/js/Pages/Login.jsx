import { useCallback, useState } from "react";
import * as yup from "yup";
import { Inertia } from "@inertiajs/inertia";
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
        try {
            await SignupSchema.validate(values, { abortEarly: false });
            setErrors({});
            Inertia.post("/")
        } catch (err) {
            const validationErrors = {};
            err.inner.forEach((error) => {
                validationErrors[error.path] = error.message;
            });
            setErrors(validationErrors);
        }
    };

    return (
        //Caso começe a quebrar em medias maiores, pedir pelo fundo como imagem
        <div className=" bg-loginfundo w-screen bg-no-repeat bg-contain text-[1.2vw] font-roboto overflow-hidden">
            <div className=" bg-gradient-to-r from-[#F9CDA353] to-bodyColor min-h-screen to-[50%]  z-10">
                <Header></Header>
                <form
                    action=""
                    className="ml-auto w-[25vw] mr-[15vw] mt-[25vh]"
                >
                    <div class="relative mt-2 w-[100%]">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <img
                                src="/images/User.png"
                                className="ml-[1vw] w-[1vw]"
                            />
                        </div>
                        <input
                            type="text"
                            name="price"
                            id="price"
                            class="block ml-[1vw] w-full border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-[#FFB718] placeholder:text-gray-400"
                            placeholder="Úsuario"
                        />
                    </div>
                    <div class="relative mt-2 w-[100%] text-[1.2vw]">
                        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <img
                                src="/images/Senha.png"
                                className="ml-[1vw] w-[1vw]"
                            />
                        </div>
                        <input
                            type="text"
                            name="price"
                            id="price"
                            class="block ml-[1vw] w-full border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-[#FFB718] placeholder:text-gray-400"
                            placeholder="Senha"
                        />
                    </div>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </div>
    );
}
