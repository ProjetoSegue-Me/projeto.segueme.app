import { useRouter } from "next/router";
import React from "react";

export default function Card(props: any) {
  const router = useRouter();
  return (
    <div className="flex flex-col w-[27.5vw] font-roboto">
      <img
        src={props.imageSource}
        className="w-[7vw] h-[7vw] rounded-full ml-auto mb-[-3vw] mr-[2vw] z-10 border-[#F9CDA3] border-[0.5vw] object-cover object-center"
      />
      <div className="bg-[#894a2a] w-full bg-opacity-30 rounded-3xl pl-[2vw] pt-[2vw] gap-[1.5vw] flex flex-col">
        <p className="text-[1.2vw]">{props.titulo}</p>
        <p className="text-[1.2vw]">{props.nome}</p>
        <p className="text-[1.2vw]">{props.infoAdicional}</p>

        <div className="w-full flex flex-row gap-[1.5vw]">
          {/*TODO: Renderização condicional dos botões Editar e Deletar de acordo com a página*/}
          <button
            className="w-[3.5vw] h-[3.5vw] bg-[#FFB718] bg-opacity-[3%] border-[#FFB718] border-[1px] rounded-full p-[1vw] hover:bg-opacity-10"
            onClick={props.openEdit}
          >
            <img src="/images/Edit.png" className="w-full" />
          </button>
          <button
            className="w-[3.5vw] h-[3.5vw] bg-[#FFB718] bg-opacity-[3%] border-[#FFB718] border-[1px] rounded-full p-[1vw] hover:bg-opacity-10"
            onClick={props.openDelete}
          >
            <img src="/images/Delete.png" className="w-full" />
          </button>

          <button
            className="ml-auto mb-[1vw] mr-[2vw] w-fit text-[1.2vw] font-roboto bg-[#FFB718] rounded-full px-[2.5vw] py-[0.75vw]"
            onClick={() => router.push(props.rota)}
          >
            Ver mais...
          </button>
        </div>
      </div>
    </div>
  );
}
