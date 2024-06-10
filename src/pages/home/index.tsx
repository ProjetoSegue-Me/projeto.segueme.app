import Header from "@/components/Header";
import Titulo from "@/components/Titulo";


export default function Eventos() {
    return (
        <div className="bg-[#F9CDA3] min-h-[100vh] overflow-hidden">
            <Header></Header>
            <div>
                <Titulo conteudo="0 Retiros"></Titulo>
                {/*TODO: Fazer renderização condicional caso não tenha nenhum retiro planejado (Depende do Back-end e banco de dados) */}
                <h1 className="mx-auto w-fit font-roboto text-[1.5vw] py-[8vw]">
                    Não há nenhum retiro planejado
                </h1>
            </div>
            <div>
                <Titulo conteudo="0 Eventos"></Titulo>

                {/*TODO: Fazer renderização condicional caso não tenha nenhum evento planejado (Depende do Back-end e banco de dados) */}
                <h1 className="mx-auto w-fit font-roboto text-[1.5vw] py-[8vw]">
                    Não há nenhum evento planejado
                </h1>
            </div>
        </div>
    );
}
