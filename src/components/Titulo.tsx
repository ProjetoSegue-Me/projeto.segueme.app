import React from "react";

export default function Titulo(props: any) {
    return (
        <div className=" bg-gradient-to-r from-[#F9CDA3] to-[#FFB718] w-[90vw] mx-auto flex justify-end py-[0.75vw]">
            <h1 className="font-roboto mr-[2.5vw] text-[1.2vw]">{props.conteudo}</h1>
        </div>
    );
}
