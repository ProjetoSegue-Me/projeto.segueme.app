import React, { useState } from "react";
import Header from "../Components/Header";
import { InertiaLink } from "@inertiajs/inertia-react";
import Titulo from "../Components/Titulo";
export default function Eventos() {
    return (
        <div className="bg-[#F9CDA3] overflow-hidden">
            <Header></Header>
            <div className="mt-[5vw] flex flex-col justify-center">
                <Titulo conteudo="Criar Eventos"></Titulo>
                <div className="flex flex-row mx-auto">
                    <InertiaLink className="bg-[white] rounded-l-full w-[35vw] text-center py-[0.75vw]  my-[2.5vw]  text-[1.2vw] border-[1px] border-[#FFB718] hover:bg-[#ffead6] ease-in duration-100">
                        Criar Encontro
                    </InertiaLink>
                    <InertiaLink className="bg-[white] rounded-r-full w-[35vw] text-center py-[0.75vw]  my-[2.5vw] text-[1.2vw] border-[1px] border-[#FFB718] hover:bg-[#ffead6] ease-in duration-100">
                        Criar Retiro
                    </InertiaLink>
                </div>
            </div>
            <div>
                <Titulo conteudo="Eventos em Andamento"></Titulo>
                {/*TODO: Fazer renderização condicional caso não tenha nenhum evento em andamento (Depende do Back-end e banco de dados) */}
                <h1 className="mx-auto w-fit font-roboto text-[1.5vw] py-[8vw]">
                    Não há nenhum evento em andamento
                </h1>
            </div>
            <div>
                <Titulo conteudo="Eventos Finalizados"></Titulo>
                <div className="flex mx-auto w-fit gap-[3vw] mt-[4vw]">
                    <div>
                        <button className="bg-[white] rounded-l-full w-[35vw] py-[0.75vw] border-[1px] border-[#FFB718] text-[1.2vw] hover:bg-[#ffead6] ease-in duration-100">
                            Encontros
                        </button>
                        <button className="bg-[white] rounded-r-full w-[35vw] py-[0.75vw] border-[1px] border-[#FFB718] text-[1.2vw] hover:bg-[#ffead6] ease-in duration-100">
                            Retiros
                        </button>
                    </div>
                    <button className="bg-[white] rounded-full w-[4vw] h-[4vw] mt-[1vw] border-[1px] border-[#FFB718] text-[1.2vw] hover:bg-[#ffead6] ease-in duration-100">
                        <img
                            src="/images/Pesquisa.png"
                            className="h-[1.5vw] mx-auto"
                        />
                    </button>
                </div>
                {/*TODO: Fazer renderização condicional caso não tenha nenhum evento finalizado (Depende do Back-end e banco de dados) */}
                <h1 className="mx-auto w-fit font-roboto text-[1.5vw] py-[8vw]">
                    Ainda não ocorreu nenhum evento
                </h1>
            </div>
        </div>
    );
}
