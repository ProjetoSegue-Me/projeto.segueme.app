import React, { useState } from "react";
import Header from "@/components/Header";
import Titulo from "@/components/Titulo";
import { useRouter } from "next/router";
import Card from "@/components/Card";
import Modal from "@/components/Modal";

const fetchAll = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/members/getAll`);
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
  const memberData = await fetchAll();

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

const bufferImage = (bufferData: any) => {
  const imageBase64 = Buffer.from(bufferData.data).toString("base64");
  return "data:image/png;base64 ," + imageBase64;
};

export default function Cadastro({ memberData }: any) {
  const router = useRouter();
  //Modal info
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("Delete");

  //Renderização condicional de categoria
  const [viewCategory, setViewCategory] = useState("Tios");

  //Termos de pesquisa
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<String[]>([]);

  //Id de deleção e edição
  const [ID, setID] = useState();

  const handleDelete = async () => {
    try {
      const response = await fetch("/api/members/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: ID }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log(result);
      router.reload();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to delete member:", error);
    }
  };

  const handleSearchChange = async (e: any) => {
    const term = e.target.value;
    setSearchTerm(term);
    let response = memberData.filter((member: any) => member.NomeCompleto.toLowerCase().includes(searchTerm.toLowerCase())).map((member: any) => member.NomeCompleto)
    if (term == "") {
      response = []
    }

    const results = response

    if (Array.isArray(results)) {
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleOpenDelete = (id: any) => {
    setID(id);
    setModalType("Delete");
    setIsModalOpen(true);
    console.log(ID);
  };

  const handleOpenSearch = () => {
    setModalType("Search");
    setIsModalOpen(true);
  };

  const renderMembers = () => {
    if (viewCategory === "Tios") {
      return memberData
        .filter((member: any) => member.Conjuge !== null)
        .map((member: any) => (
          <Card
            key={member.idPessoa}
            imageSource={bufferImage(member.foto)}
            titulo="Tio/Tia"
            nome={member.NomeCompleto}
            openDelete={() => handleOpenDelete(member.idPessoa)}
            openEdit={() =>
              router.push({
                pathname: "/cadastro/form",
                query: { id: member.idPessoa },
              })
            }
            infoAdicional={
              member.telefone[0]
                ? formatarTelefone(member.telefone[0].Numero)
                : "N/A"
            }
            rota={`/cadastro/detalhes/${member.idPessoa}`}
          />
        ));
    } else {
      return memberData
        .filter((member: any) => member.Conjuge === null)
        .map((member: any) => (
          <Card
            key={member.idPessoa}
            imageSource={bufferImage(member.foto)}
            titulo="Primo/Prima"
            nome={member.NomeCompleto}
            openDelete={() => handleOpenDelete(member.idPessoa)}
            openEdit={() =>
              router.push({
                pathname: "/cadastro/form",
                query: { id: member.idPessoa },
              })
            }
            infoAdicional={
              member.telefone[0]
                ? formatarTelefone(member.telefone[0].Numero)
                : "N/A"
            }
            rota={`/cadastro/detalhes/${member.idPessoa}`}
          />
        ));
    }
  };

  const handleViewChange = (Category: string) => {
    setViewCategory(Category);
  };
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
            <button
              className="bg-[white] rounded-l-full w-[35vw] h-[3.5vw] border-[1px] border-[#FFB718] text-[1.2vw] hover:bg-[#ffead6] ease-in duration-100"
              onClick={() => handleViewChange("Tios")}
            >
              Tios/Tias
            </button>
            <button
              className="bg-[white] rounded-r-full w-[35vw] h-[3.5vw] border-[1px] border-[#FFB718] text-[1.2vw] hover:bg-[#ffead6] ease-in duration-100"
              onClick={() => handleViewChange("Primos")}
            >
              Primos/Primas
            </button>
          </div>
          <button
            className="bg-[white] rounded-full w-[3.5vw] h-[3.5vw]  border-[1px] border-[#FFB718] text-[1.2vw] hover:bg-[#ffead6] ease-in duration-100"
            onClick={handleOpenSearch}
          >
            <img src="/images/Pesquisa.png" className="h-[1.5vw] mx-auto" />
          </button>
        </div>
        {!memberData ? (
          <h1 className="mx-auto w-fit font-roboto text-[1.5vw] py-[8vw]">
            Não há nenhum membro cadastrado atualmente
          </h1>
        ) : (
          <div className="flex w-[90vw] mx-auto flex-wrap justify-between mt-[8vw] gap-y-[4vw]">
            {renderMembers()}
          </div>
        )}
      </div>
      {isModalOpen && (
        <Modal
          type={modalType}
          conteudo={modalType == "Delete" ? "Cadastro" : "Nome"}
          titulo={
            modalType == "Delete" ? "Confirmar Exclusão" : "Pesquisar Cadastro"
          }
          onClose={() => setIsModalOpen(false)}
          searchResults={searchResults}
          searchTerm={searchTerm}
          onChange={handleSearchChange}
          onDelete={handleDelete}
        ></Modal>
      )}
    </div>
  );
}
