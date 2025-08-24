"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./MenuLord.module.css";

interface Lord {
  _id: string;
  name: string;
  role: string;
  avatar?: string;
  createdAt: Date;
}

export default function MenuLord() {
  const router = useRouter();
  const [lords, setLords] = useState<Lord[]>([]);
  const [selectedLord, setSelectedLord] = useState<Lord | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLords() {
      try {
        const res = await fetch("/api/lords");
        if (!res.ok) {
          throw new Error("Не удалось загрузить персонажей");
        }
        const data = await res.json();
        setLords(data);
        if (data.length > 0) {
          // Выбираем первого персонажа по умолчанию
          // Здесь можно будет загружать последнего выбранного
          setSelectedLord(data[0]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLords();
  }, []);

  const handleEnterGame = () => {
    if (selectedLord) {
      localStorage.setItem("lord", JSON.stringify(selectedLord));
      router.push("/game-home");
    }
  };

  if (isLoading) {
    return <div className={styles.loadingScreen}>Загрузка информации...</div>;
  }

  // Пока нет персонажей, предлагаем создать
  if (lords.length === 0) {
    return (
       <div className={styles.container}>
        <div className={styles.noCharsContainer}>
          <h1 className={styles.noCharsTitle}>У вас пока нет персонажей</h1>
          <button onClick={() => router.push('/create-lord')} className={styles.createFirstCharButton}>
            Создать первого героя
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {/* Верхние информационные панели */}
      <div className={styles.topLeftInfo}>Игровой сервер: Загружаем серверную информацию...</div>
      <div className={styles.topRightInfo}>Вы на сервере Наследие Богов</div>

      {/* Центральный персонаж */}
      <div className={styles.characterDisplay}>
        <Image
          src={selectedLord?.avatar || "/default-lord.png"} // Убедись, что у лорда есть поле avatar
          alt={selectedLord?.name || "Персонаж"}
          width={400}
          height={600}
          className={styles.characterImage}
        />
      </div>
       <div className={styles.platform}></div>


      {/* Правая панель с информацией о персонаже */}
      {selectedLord && (
        <div className={styles.characterInfoPanel}>
          <div className={styles.infoName}>{selectedLord.name}</div>
          <div className={styles.infoRole}>{selectedLord.role}</div>
          <div className={styles.infoLevel}>Уровень 1</div>
          <div className={styles.infoLocation}>Стартовая локация</div>
        </div>
      )}

      {/* Нижний HUD */}
      <div className={styles.bottomHud}>
        <div className={styles.hudButton} title="Назад">
          {/* Иконка назад */}
        </div>
        <div className={styles.hudButton} title="Мир">
          {/* Иконка мира */}
        </div>
        <div className={styles.hudButton} title="Настройки">
          {/* Иконка настроек */}
        </div>

        <button className={styles.hubButton} 
          title="enter game"
          onClick={handleEnterGame}  
        >
          Enter Game
        </button>
      </div>
    </div>
  );
}