import React, { useState } from "react";
import Header from "../Components/Header";
import { InertiaLink } from "@inertiajs/inertia-react";
import Titulo from "../Components/Titulo";
export default function Cadastro() {
    return (
        <div className="bg-[#F9CDA3] overflow-hidden">
            <Header></Header>
            <div className="mt-[5vw] flex flex-col justify-center">
                <Titulo conteudo="Cadastrar"></Titulo>
                <InertiaLink className="bg-white rounded-full px-[10vw] py-[0.75vw] mx-auto my-[2.5vw] w-fit text-[1.2vw] border-[1px] border-[#FFB718] hover:bg-[#ffead6] ease-in duration-100">
                    Criar Cadastro
                </InertiaLink>
            </div>
            <div>
                <Titulo conteudo="Todos os Cadastros"></Titulo>
                <div className="flex mx-auto w-fit gap-[3vw] mt-[4vw]">
                    <div>
                        <button className="bg-white rounded-l-full px-[10vw] py-[0.75vw] border-[1px] border-[#FFB718] text-[1.2vw] hover:bg-[#ffead6] ease-in duration-100">
                            Tios/Tias
                        </button>
                        <button className="bg-white rounded-r-full px-[10vw] py-[0.75vw] border-[1px] border-[#FFB718] text-[1.2vw] hover:bg-[#ffead6] ease-in duration-100">
                            Primos/Primas
                        </button>
                    </div>
                    <button className="bg-white rounded-full w-[4vw] border-[1px] border-[#FFB718] text-[1.2vw] hover:bg-[#ffead6] ease-in duration-100">
                        {" "}
                        <img
                            src="/images/Pesquisa.png"
                            className="h-[1.5vw] mx-auto"
                        />{" "}
                    </button>
                </div>

                <h1 className="mx-auto w-fit font-roboto text-[1.5vw] py-[8vw]">Não há nenhum membro cadastrado atualmente</h1>
            </div>
        </div>
    );
}
