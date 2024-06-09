import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="bg-[url('/images/Landing.jpg')]  bg-cover min-h-screen">
      <Header />

      <h1 className="w-[20vw] font-bold font-roboto text-[1.4vw] ml-[10vw] mt-[10vh]">
        “... e disse-lhe: “Segue-me”. E levantando-se o seguiu.” <br />
        (Mateus 9.9)
      </h1>
    </main>
  );
}
