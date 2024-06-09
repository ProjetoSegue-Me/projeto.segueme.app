import React from "react";
import { usePathname } from 'next/navigation'

export default function Header() {
  const url = usePathname();
  return (
    <div className="w-[100vw] flex  items-center justify-between pt-[1vw]">
      <a href="/" className="ml-[3vw]">
        <img src="/images/Segue-me.png" className="w-[7.5vw]" />
      </a>

      <div className="flex gap-[12.5vw] justify-between mr-[5vw]">
        {url != "/" ? (
          <a
            className=" font-normal font-roboto text-[1.2vw] text-[#894A2A]"
            href="/"
          >
            Inicio
          </a>
        ) : (
          <p className=" font-normal font-roboto text-[1.2vw]">Inicio</p>
        )}
        <a
          className=" font-normal font-roboto text-[1.2vw] text-[#894A2A]"
          href="/"
        >
          Contato
        </a>
        <a
          className=" font-normal font-roboto text-[1.2vw] text-[#894A2A]"
          href="/cadastro"
        >
          Login
        </a>
      </div>
    </div>
  );
}
