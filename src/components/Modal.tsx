import React, { useState } from "react";

export default function Modal(props: any) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bodyColor bg-opacity-90">
      <div className="w-[50vw] rounded-2xl overflow-hidden">
        <div className="flex justify-between items-center bg-[#FFB718] px-[2vw] py-[1vw]">
          <h2 className="">{props.titulo}</h2>
          <button onClick={props.onClose} className="text-white">
            X
          </button>
        </div>
        <div className="p-[2vw] bg-[#894A2A] bg-opacity-30">
          {props.type === "Delete" && (
            <div className="flex flex-col items-center">
              <div
                className="bg-white w-[80%] py-[2vw] text-center border-2"
                style={{ borderColor: "#FFB718" }}
              >
                <p>Gostaria realmente de excluir esse {props.conteudo}?</p>
              </div>
              <button
                onClick={props.onDelete}
                className="mt-[2vw] bg-[#FF1717] text-white py-[0.5vw] px-[1.5vw] w-fit rounded-full"
              >
                Excluir
              </button>
            </div>
          )}
          {props.type === "Search" && (
            <div>
              <label className="block mb-2">{props.conteudo}</label>
              <input
                type="text"
                value={props.searchTerm}
                onChange={props.onChange}
                className="w-full p-2 border rounded"
              />
              <div className="mt-4 max-h-40 overflow-y-auto">
                {props.searchResults.map((result: any, index: any) => (
                  <div key={index} className="p-2 border-b">
                    {result}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
