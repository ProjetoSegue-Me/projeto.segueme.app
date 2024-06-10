import React from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";

export default function Erro() {
  const router = useRouter();
  return (
    <div className="bg-[#F9CDA3] h-[100vh]">
      <Header />
      <div className="flex flex-col">
        <img src="/images/Erro.png" className="mx-auto w-[4vw] mt-[15vh]" />
        <h1 className="w-fit mx-auto mt-[5vh] text-[1.2vw] font-roboto">
          {!router.query.message
            ? "Algo de errado aconteceu!"
            : router.query.message}
        </h1>
        <button
          className="mx-auto w-fit text-[1.2vw] font-roboto bg-[#FFB718] mt-[5vh] rounded-full px-[2.5vw] h-[3.5vw]"
          onClick={() => router.back()}
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
