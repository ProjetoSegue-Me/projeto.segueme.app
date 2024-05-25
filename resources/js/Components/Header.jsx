import React from "react";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";

export default function Header() {
    const { url } = usePage();
    return (
        <div className="w-[100vw] flex  items-center justify-between pt-[1vw]">
            <InertiaLink href="/" className="ml-[3vw]">
                <img src="/images/Segue-me.png" className="w-[7.5vw]" />
            </InertiaLink>

            <div className="flex gap-[5vw] mr-[3vw]">
                {url != "/" ? (
                    <InertiaLink
                        className=" font-normal font-roboto text-[1.2vw] text-[#894A2A]"
                        href="/"
                    >
                        Inicio
                    </InertiaLink>
                ) : (
                    <p className=" font-normal font-roboto text-[1.2vw]">
                        Inicio
                    </p>
                )}
                <InertiaLink
                    className=" font-normal font-roboto text-[1.2vw] text-[#894A2A]"
                    href="/"
                >
                    Contato
                </InertiaLink>
                <InertiaLink
                    className=" font-normal font-roboto text-[1.2vw] text-[#894A2A]"
                    href="/Cadastro"
                >
                    Login
                </InertiaLink>
            </div>
        </div>
    );
}
