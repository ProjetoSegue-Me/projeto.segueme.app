import React from "react";
import Titulo from "@/components/Titulo";
import Header from "@/components/Header";
import { useRouter } from "next/router";

export default function DetalhesMembro() {
    const router = useRouter()
  return (
    <div className="bg-[#F9CDA3] min-h-[100vh] overflow-hidden">
      <Header />

      <div className="flex flex-col mt-[2.5vw]">
        <Titulo conteudo="Cadastro - Ver Mais" />

        <div className="bg-[#894A2A4D] w-[90vw] mx-auto mt-[5vw] flex flex-col">
          <div className="flex flex-row ml-[2.5vw] mt-[2.5vw]">
            {/*TODO: Substituir dados placeholder com dados alimentados pelo Controller */}
            <img src="/images/PlaceholderDetalhes.png" className="w-[25%]" />
            <div className="flex flex-col text-[1.2vw] ml-[6vw] gap-[1vw] font-roboto">
              <p>Jovem/Casal Fichas:</p>
              <p className="mt-[2vw]">Data: 20/06/2024</p>
              <p className="mt-[4vw]">Nome Completo: Paulo Andre Nascimento</p>
              <p>Cônjuge: Maria Paula Nascimento</p>
              <div className="flex flex-row w-[60vw] justify-between">
                <p>Telefone 01: (65) 98479-4520</p>
                <p className="w-[50%]">Telefone 02:</p>
              </div>
              <p>Endereço: Rua das Orquídeas, Nº 37</p>
              <div className="flex flex-row w-[60vw] justify-between">
                <p>Bairro: Coxipó</p>
                <p className="w-[50%]">CEP: 78840-000</p>
              </div>
              <p>E-mail: pedro.paulo@gmail.com</p>
              <p>Instagram: @PNascimento</p>
            </div>
          </div>
          {/*TODO: Fazer o redirecionamento correto */}
          <button
            className="ml-auto mb-[2vw] mr-[5vw] w-fit text-[1.2vw] font-roboto bg-[#FFB718] rounded-full px-[2.5vw] py-[0.75vw]"
            onClick={()=> router.push("/cadastro")}
          >
            Editar
          </button>
        </div>
        {/*TODO: Assim que concluido, fazer o carregar mais corretamente, drawer incluso */}
        <div className=" flex-col justify-center mx-auto ">
          <p className=" bg-[#FFB718] w-[90vw] text-[1.2vw] text-center py-[0.5vw]">
            Carregar Mais
          </p>
          <p className=" text-[1vw] mx-auto w-fit bg-[#FFB718] px-[2vw] rounded-b-lg ">
            ˅
          </p>
        </div>
        <button
          className="mt-[5vw] ml-[5vw] w-fit text-[1.2vw] font-roboto bg-[#FFB718] rounded-full px-[2.5vw] py-[0.75vw]"
          onClick={()=> router.back()}
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
