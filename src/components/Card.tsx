import { useRouter } from "next/router";
import React from "react";

export default function Card(props : any) {
    const router = useRouter()
  return (
    <div className="flex flex-col w-[25vw] font-roboto">
      <img
        src="/images/Retiro.png"
        className="w-[7vw] h-[7vw] rounded-full ml-auto mb-[-3vw] mr-[2vw] z-10 border-[#F9CDA3] border-[0.5vw]"
      />
      {/*TODO: Buscar dados do back-end */}
      <div className="bg-[#894a2a] w-full bg-opacity-30 rounded-3xl pl-[2vw] pt-[2vw] gap-[2vw] flex flex-col">
        <p className="text-[1.2vw]">Segue-me</p>
        <p className="text-[1.2vw]">10ª Edição</p>
        <p className="text-[1.2vw]">19/07/2024 - 21/07/2024</p>

        <div className="w-full flex flex-row gap-[1.5vw]">
          {/*TODO: Renderização condicional dos botões Editar e Deletar de acordo com a página*/}
          <button className="w-[3.5vw] h-[3.5vw] bg-[#FFB718] bg-opacity-[3%] border-[#FFB718] border-[1px] rounded-full p-[1vw] hover:bg-opacity-10">
            <img src="/images/Edit.png" />
          </button>
          <button className="w-[3.5vw] h-[3.5vw] bg-[#FFB718] bg-opacity-[3%] border-[#FFB718] border-[1px] rounded-full p-[1vw] hover:bg-opacity-10">
            <img src="/images/Delete.png" alt="" />
          </button>

          <button
            className="ml-auto mb-[1vw] mr-[2vw] w-fit text-[1.2vw] font-roboto bg-[#FFB718] rounded-full px-[2.5vw] py-[0.75vw]"
            onClick={() => router.push("/cadastro")}
          >
            Ver mais...
          </button>
        </div>
      </div>
    </div>
  );
}
