import React, { useState } from "react";
import Header from "../Components/Header";

export default function Landing(){
    return (
        <div className="bg-landing  bg-cover h-[100vh]">
            <Header/>
            
            <h1 className="w-[20vw] font-bold font-roboto text-[1.4vw] ml-[10vw] mt-[10vh]">“... e disse-lhe: “Segue-me”. E levantando-se o seguiu.” <br/>(Mateus 9.9)</h1>
        </div>
    );
};
