// app/pages.tsx
"use client"
import { TONWalletConnect } from "@/components/wallet-connect";
import { useTonWallet } from "@tonconnect/ui-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Login() {
  const wallet = useTonWallet();
  const router = useRouter();

  function handleEnter() {
    const lord = localStorage.getItem("lord");
    if (lord) {
      router.push("/menu-lord");
    } else {
      router.push("/create-lord");
    }
  }

  const walletConnected = !!wallet;

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center"
      style={{
        background: "url('/bg-wellcom.jpg') center/cover no-repeat",
        position: "relative"
      }}
    >
      <div className="absolute top-4 center-4">
        <TONWalletConnect />
      </div>
      

      <div className="rounded-3xl bg-blck/70 px-24 py-14 md-16 flex flex-col items-center">
        <h1 className="text-5xl font-bold text-yellow-200 tracking-wide" style={{ fontFamily: "Cinzel, serif" }}>
          Dominum 0.1
        </h1>

        <Image 
          src="/logo-wellcom.png" alt="Logo Wellcom"
          width={680} height={380}
        />
      </div>

      {!walletConnected && (
        <div className="text-white mb-18 text-2xl opacity-70">
          Подключите кошелёк для входа
        </div>
      )}

      <button
        className="text-2xl px-24 py-6 rounded-xl font-bold"
        style={{
          background: walletConnected
            ? "linear-gradient(90deg, #246ae7, #4be4f7)"
            : "#7f8fa6",
          color: "#fff",
          cursor: walletConnected ? "pointer" : "not-allowed",
          opacity: walletConnected ? 1 : 0.7,
          marginBottom: 10,
        }}
        onClick={walletConnected ? handleEnter : undefined}
        disabled={!walletConnected}
      >
        Войти в игру
      </button>

      

    </div>
  );
}

