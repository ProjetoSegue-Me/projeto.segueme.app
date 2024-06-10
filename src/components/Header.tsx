import React from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { useRouter } from "next/router";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const sessionId = document.cookie
      .split("; ")
      .find((row) => row.startsWith("sessionId="))
      ?.split("=")[1];
    if (sessionId) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  const router = useRouter();
  const url = usePathname();

  const handleLogout = async () => {
    const response = await fetch("/api/mock/logout", {
      method: "POST",
    });
    if (response.ok) {
      router.push("/");
    } else {
      alert("Logout falhou");
    }
  };

  return (
    <div className="w-[100vw] flex  items-center justify-between pt-[1vw]">
      <a href="/" className="ml-[3vw]">
        <img src="/images/Segue-me.png" className="w-[7.5vw]" />
      </a>

      {!isLoggedIn ? (
        <div className="flex gap-[12.5vw] justify-between mr-[5vw]">
          <a
            className=" font-normal font-roboto text-[1.2vw] text-[#894A2A]"
            href="/"
          >
            Inicio
          </a>

          <a
            className=" font-normal font-roboto text-[1.2vw] text-[#894A2A]"
            href="/"
          >
            Contato
          </a>
          <a
            className=" font-normal font-roboto text-[1.2vw] text-[#894A2A]"
            href="/login"
          >
            Login
          </a>
        </div>
      ) : (
        <div className="flex gap-[12.5vw] justify-between mr-[5vw]">
          <a
            className=" font-normal font-roboto text-[1.2vw] text-[#894A2A]"
            href="/home"
          >
            Inicio
          </a>

          <a
            className=" font-normal font-roboto text-[1.2vw] text-[#894A2A]"
            href="/cadastro"
          >
            Cadastro
          </a>
          <a
            className=" font-normal font-roboto text-[1.2vw] text-[#894A2A]"
            href="/"
          >
            Eventos
          </a>
          <a
            className=" font-normal font-roboto text-[1.2vw] text-[#894A2A] hover:cursor-pointer"
            onClick={handleLogout}
          >
            Sair
          </a>
        </div>
      )}
    </div>
  );
}
