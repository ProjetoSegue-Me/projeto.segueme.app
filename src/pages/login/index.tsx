import { FormEvent, useCallback, useState } from "react";
import * as yup from "yup";
import Header from "@/components/Header";
import { useRouter } from "next/router";

const validationSchema = yup.object().shape({
  login: yup
    .string()
    .matches(/^[a-zA-Z]+\.[a-zA-Z]+$/, "Login inválido")
    .required("Login é um campo obrigatório"),
  senha: yup.string().required("Senha é um campo obrigatório"),
});
interface FormSchema {
  login: string;
  senha: string;
}
export default function Login() {

  const router = useRouter()
  const [values, setValues] = useState({
    login: "",
    senha: "",
  });

  const [errors, setErrors] = useState({} as FormSchema);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        await validationSchema.validate(values, { abortEarly: false });
        setErrors({ login: "", senha: "" });
        const res = await fetch("/api/mock/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (res.ok) {
          router.push("/home")
        } else {
          const errorData = await res.json();
          router.push({ pathname: "/erro", query: { message: errorData.message } });
        }
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const newErrors: any = {};
          err.inner.forEach((error) => {
            if (error.path) {
              newErrors[error.path] = error.message;
            }
          });
          setErrors(newErrors);
        }
      }
    },
    [values]
  );

  return (
    //Caso começe a quebrar em medias maiores, pedir pelo fundo como imagem
    <div className=" bg-[url('/images/FundoLogin.png')]  w-screen bg-no-repeat bg-contain text-[1.2vw] font-roboto overflow-hidden">
      <div className=" bg-gradient-to-r from-[#F9CDA353] to-bodyColor min-h-screen to-[50%]  z-10">
        <Header></Header>

        <form
          className="ml-auto w-[25vw] mr-[15vw] mt-[20vh]"
          onSubmit={handleSubmit}
          method="POST"
        >
          <h1 className="text-[1.2vw] mb-[2vh]">Login</h1>
          <div className="relative mt-2 w-[100%] text-[1.2vw]">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-[3.5%]">
              <img src="/images/User.png" className=" w-[1vw]" />
            </div>
            <input
              type="text"
              name="login"
              id="login"
              className="block  w-full border-0 py-1.5 pl-[10%] pr-20 text-gray-900 ring-1 ring-inset ring-[#FFB718] placeholder:text-gray-400"
              placeholder="Úsuario"
              value={values.login}
              onChange={handleChange}
            />
          </div>
          <p className="font-roboto text-[0.8vw] text-red-600 whitespace-pre">
            {!errors.login ? " " : errors.login}
          </p>
          <div className="relative mt-2 w-[100%] text-[1.2vw]">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-[3.5%]">
              <img src="/images/Senha.png" className=" w-[1vw]" />
            </div>
            <input
              type="password"
              name="senha"
              id="senha"
              className="block  w-full border-0 py-1.5 pl-[10%] pr-20 text-gray-900 ring-1 ring-inset ring-[#FFB718] placeholder:text-gray-400"
              placeholder="Senha"
              value={values.senha}
              onChange={handleChange}
            />
          </div>
          <p className="font-roboto text-[0.8vw] text-red-600">
            {!errors.senha ? " " : errors.senha}
          </p>
          <button
            type="submit"
            className="  w-fit text-[1.2vw] font-roboto bg-[#FFB718] mt-[5vh] rounded-full px-[2.5vw] h-[3vw] "
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
