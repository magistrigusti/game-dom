// frontend/app/create-lord/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import lordRoles from "@/config/lordRoles";
import Image from "next/image";

export default function CreateLordPage() {
  const [lordName, setLordName] = useState("");
  const [selected, setSelected] = useState(lordRoles[0]);
  const router = useRouter();

  const isReady = lordName.trim().length > 0 && !!selected;

  function handleSelect(roleId: string) {
    const role = lordRoles.find(r => r.id === roleId);
    if (role) setSelected(role);
  }

  async function handleCreate() {
    if (!isReady) return;
    const res = await fetch("/api/create-lord", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: lordName.trim(),
        role: selected.id,
      }),
    });
    if (res.ok) {
      router.push("/menu-lord");
    } else {
      alert("Ошибка создания лорда!");
    }
  }

  // --- UI ---
  return (
    <div
      className="flex flex-col min-h-screen w-full items-center
      justify-start bg-neutral-950"
    >
      <h1 className="mt-10 mb-8 text-4xl font-bold text-white text-center">
        Создание Лорда
      </h1>

      <div
        className="
          flex flex-row
          w-full max-w-[1600px] min-h-[600px]
          justify-center items-center
        "
      >

        {/* Левая колонка ролей */}
        <div
          className="
            flex flex-col gap-6 items-center
            min-w-[120px] max-w-[160px]
          "
        >
          {lordRoles.map((role) => {
            const isSelected = selected.id === role.id;
            const buttonClass = [
              "w-20 h-20 rounded-2xl border-2 bg-black/40",
              isSelected ? "border-blue-400 shadow-xl" : "border-gray-600",
              "hover:border-yellow-300 transition-all"
            ].join(" ");

            return (
              <button
                key={role.id}
                title={role.name}
                className={buttonClass}
                onClick={() => handleSelect(role.id)}
              >
                <Image
                  src={role.icon}
                  alt={role.name}
                  width={56}
                  height={56}
                  className="object-contain"
                />
                <div className="mt-2 text-xs text-gray-300">{role.name}</div>
              </button>
            );
          })}
        </div>

        {/* Центральный крупный блок — герой и имя */}
        <div
          className="
            flex flex-col items-center justify-start
            mx-12 min-w-[440px] max-w-[600px] bg-black/60 rounded-3xl p-10
            shadow-2xl"
        >
          {/* Превью героя */}
          <div
            className="
              w-[260px] h-[260px] flex items-center justify-center
              mb-4 border-4 border-yellow-200 rounded-2xl bg-black/40
            "
          >
            {selected && (
              <Image
                src={selected.avatar}
                alt={selected.name}
                width={220}
                height={220}
                className="object-contain"
              />
            )}
          </div>
          <div className="text-3xl font-bold text-white mb-4">
            {selected?.name}
          </div>

          <input
            placeholder="Введите имя Лорда"
            value={lordName}
            onChange={e => setLordName(e.target.value)}
            className="
              text-xl px-6 py-4 rounded-lg border-2 border-[#555]
              mb-4 bg-neutral-900 text-white w-full text-center
              shadow-md
            "
            maxLength={24}
          />
        </div>

        {/* Правая колонка — описание и скиллы */}
        <div
          className="
            flex flex-col justify-start ml-12 max-w-[540px] min-w-[400px]
            bg-black/70 rounded-2xl p-8 shadow-xl
          "
        >
          <h2 className="text-2xl text-yellow-200 font-bold mb-4">
            Описание роли
          </h2>
          <p className="text-white text-lg mb-7 min-h-[60px]">
            {selected?.description}
          </p>

          <div className="text-lg text-cyan-200 font-bold mb-2">
            Умения:
          </div>
          <ul className="mb-6">
            {selected.skills.map(skill => (
              <li key={skill.name} className="mb-2">
                <span className="text-cyan-100 font-semibold">
                  {skill.name}:
                </span>
                <span className="text-white ml-2">
                  {skill.description}
                </span>
              </li>
            ))}
          </ul>

          <div className="text-lg text-fuchsia-200 font-bold mb-1">
            Уникальный перк:
          </div>
          <div className="mb-2">
            <span className="text-fuchsia-100 font-semibold">
              {selected.perk.name}:
            </span>
            <span className="text-white ml-2">
              {selected.perk.description}
            </span>
          </div>
        </div>
      </div>

      {/* Кнопка создания */}
      <button
        onClick={isReady ? handleCreate : undefined}
        disabled={!isReady}
        className={[
          "mt-12 px-20 py-5 rounded-xl text-2xl font-bold shadow-lg transition",
          isReady
            ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:scale-105"
            : "bg-gray-400 text-gray-700 cursor-not-allowed"
        ].join(" ")}
      >
        {isReady ? "Выбрать и начать игру" : "Введите имя"}
      </button>
    </div>
  );
}
