import React from "react";
import Header from "../Components/Header";
import { InertiaLink } from "@inertiajs/inertia-react";

export default function Sucesso() {
    return (
        <div className="bg-[#F9CDA3] h-[100vh]">
            <Header />
            <div className="flex flex-col">
                <img
                    src="/images/Sucesso.png"
                    className="mx-auto w-[4vw] mt-[15vh]"
                />
                {/*TODO: Mudar para uma mensagem dependendo da rota tomada */}
                <h1 className="w-fit mx-auto mt-[5vh] text-[1.2vw] font-roboto">
                    Realizado com sucesso!
                </h1>

                {/*Mudar o Redirect dependendo da rota tomada */}
                <InertiaLink
                    className="mx-auto w-fit text-[1.2vw] font-roboto bg-[#FFB718] mt-[5vh] rounded-full px-[2.5vw] py-[0.75vw] "
                    href="/Cadastro"
                >
                    Voltar
                </InertiaLink>
            </div>
        </div>
    );
}
