import React, { useState } from "react";
import Header from "@/components/Header";
import Titulo from "@/components/Titulo";
import { useRouter } from "next/navigation";

export default function Cadastro() {
  const router = useRouter();
  return (
    <div className="bg-bodyColor min-h-[100vh] overflow-hidden">
      <Header />
      <div className="mt-[5vw] flex flex-col justify-center">
        <Titulo conteudo="Cadastrar" />
        <button
          onClick={() => router.push("/cadastro/form")}
          className=" bg-[white] rounded-full w-[35vw] h-[3.5vw] mx-auto my-[2.5vw] text-center text-[1.2vw] border-[1px] border-[#FFB718] hover:bg-[#ffead6] ease-in duration-100"
        >
          Criar Cadastro
        </button>
      </div>
      <div>
        <Titulo conteudo="Todos os Cadastros" />
        <div className="flex mx-auto w-fit gap-[3vw] mt-[4vw]">
          <div>
            <button className="bg-[white] rounded-l-full w-[35vw] h-[3.5vw] border-[1px] border-[#FFB718] text-[1.2vw] hover:bg-[#ffead6] ease-in duration-100">
              Tios/Tias
            </button>
            <button className="bg-[white] rounded-r-full w-[35vw] h-[3.5vw] border-[1px] border-[#FFB718] text-[1.2vw] hover:bg-[#ffead6] ease-in duration-100">
              Primos/Primas
            </button>
          </div>
          <button className="bg-[white] rounded-full w-[3.5vw] h-[3.5vw]  border-[1px] border-[#FFB718] text-[1.2vw] hover:bg-[#ffead6] ease-in duration-100">
            <img src="/images/Pesquisa.png" className="h-[1.5vw] mx-auto" />
          </button>
        </div>
        {/*TODO: Fazer renderização condicional caso não tenha nenhum usuario (Depende do Back-end e banco de dados) */}
        <h1 className="mx-auto w-fit font-roboto text-[1.5vw] py-[8vw]">
          Não há nenhum membro cadastrado atualmente
        </h1>
      </div>
    </div>
  );
}
