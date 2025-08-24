// frontend/app/create-lord/layout.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Можешь вынести header/footer в отдельные компоненты, если надо переиспользовать!
function Header() {
  return (
    <header className="w-full p-4 flex justify-center items-center bg-black/40 text-white text-2xl font-bold">
      {/* Здесь можно вставить логотип, название, статус, кнопки и т.д. */}
      Создание Лорда
    </header>
  );
}

function Footer() {
  return (
    <footer className="w-full p-4 flex justify-center items-center bg-black/40 text-white text-lg">
      {/* Любая информация: копирайт, ссылки, контакты и т.д. */}
      &copy; Allodium {new Date().getFullYear()}
    </footer>
  );
}

export default function CreateLordLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const lord = localStorage.getItem("lord");
    if (lord) {
      router.replace("/menu-lord");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{
      background: "url('/bg-create.jpg') center/cover no-repeat"
    }}>
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}
