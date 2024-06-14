import React from "react";
import Titulo from "@/components/Titulo";
import Header from "@/components/Header";
import { useRouter } from "next/router";

const fetchMemberById = async (memberId: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/members/getById?id=${memberId}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return null;
  }
};

export async function getServerSideProps(context: any) {
  const { id } = context.params;
  console.log(`Server-side fetch for member ID: ${id}`);

  const memberData = await fetchMemberById(id);

  return {
    props: { memberData },
  };
}
function formatarTelefone(number: string) {
  const cleaned = number.replace(/\D/g, "");

  const formatted = `(${cleaned.substring(0, 2)}) ${cleaned.substring(
    2,
    7
  )}-${cleaned.substring(7)}`;

  return formatted;
}
function convertByteaToUrl(bytea: any) {
  const blob = new Blob([bytea], { type: "image/jpeg" });
  return <img src={URL.createObjectURL(blob)} className="w-[25%]" />;
}
export default function DetalhesMembro({ memberData }: any) {
  const router = useRouter();
  console.log(memberData);
  return (
    <div className="bg-[#F9CDA3] min-h-[100vh] overflow-hidden">
      <Header />

      <div className="flex flex-col mt-[2.5vw]">
        <Titulo conteudo="Cadastro - Ver Mais" />

        <div className="bg-[#894A2A4D] w-[90vw] mx-auto mt-[5vw] flex flex-col">
          <div className="flex flex-row ml-[2.5vw] mt-[2.5vw]">
            {/*TODO: Substituir dados placeholder com dados alimentados pelo Controller */}
            {convertByteaToUrl(memberData.foto)}
            <div className="flex flex-col text-[1.2vw] ml-[6vw] gap-[1vw] font-roboto">
              <p>Jovem/Casal Fichas:</p>
              <p className="mt-[2vw]">Data: 20/06/2024</p>
              <p className="mt-[4vw]">
                Nome Completo: {memberData.NomeCompleto}
              </p>
              <p>Cônjuge: {memberData.Conjuge ? memberData.Conjuge : "N/A"}</p>
              <div className="flex flex-row w-[60vw] justify-between">
                <p>
                  Telefone 01:
                  {memberData.telefone[0].Numero
                    ? formatarTelefone(memberData.telefone[0].Numero)
                    : "N/A"}
                </p>
                <p className="w-[50%]">
                  Telefone 02:
                  {memberData.telefone[1]?.Numero
                    ? formatarTelefone(memberData.telefone[1].Numero)
                    : "N/A"}
                </p>
              </div>
              <p>Endereço: Rua das Orquídeas, Nº 37</p>
              <div className="flex flex-row w-[60vw] justify-between">
                <p>Bairro: Coxipó</p>
                <p className="w-[50%]">CEP: 78840-000</p>
              </div>
              <p>E-mail: {memberData.Email}</p>
              <p>
                Instagram: {memberData.Instagram ? memberData.Instagram : "N/A"}
              </p>
            </div>
          </div>
          {/*TODO: Fazer o redirecionamento correto */}
          <button
            className="ml-auto mb-[2vw] mr-[5vw] w-fit text-[1.2vw] font-roboto bg-[#FFB718] rounded-full px-[2.5vw] py-[0.75vw]"
            onClick={() => router.push("/cadastro")}
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
          onClick={() => router.back()}
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
