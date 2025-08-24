"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./MenuLord.module.css";

// Mock data, замени на реальные данные из localStorage
const mockLords = [
  { name: 'Magistry', role: 'Стандартный персонаж', avatar: '/default-lord.png', location: 'The Lighthouse', lastPlayed: '2 m.' },
];

export default function MenuLord() {
  const router = useRouter();
  const [lords, setLords] = useState(mockLords); // Используем mock, пока не обновишь create-lord
  const [selectedLord, setSelectedLord] = useState(null);

  useEffect(() => {
    // В будущем, ты будешь загружать список отсюда:
    // const storedLords = localStorage.getItem("lordsList");
    // if (storedLords) {
    //   const parsedLords = JSON.parse(storedLords);
    //   setLords(parsedLords);
    //   if (parsedLords.length > 0) {
    //     setSelectedLord(parsedLords[0]);
    //   }
    // }
    if (lords.length > 0) {
      setSelectedLord(lords[0]);
    }
  }, []);

  const handleEnterGame = () => {
    if (selectedLord) {
      // Сохраняем выбранного лорда как активного и переходим в игру
      localStorage.setItem("lord", JSON.stringify(selectedLord));
      router.push("/game");
    }
  };

  return (
    <div className={styles.container}>
      {/* Левая панель для выбора персонажа */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          {/* Замени на свой логотип */}
          <h1 className={styles.gameTitle}>Dominum</h1> 
          <h2 className={styles.pageTitle}>ПЕРСОНАЖИ</h2>
        </div>
        <div className={styles.characterList}>
          {lords.map((lord, index) => (
            <div
              key={index}
              className={`${styles.characterItem} ${selectedLord && selectedLord.name === lord.name ? styles.selected : ''}`}
              onClick={() => setSelectedLord(lord)}
            >
              <Image src={lord.avatar} alt={lord.name} width={50} height={50} className={styles.charAvatar} />
              <div className={styles.charInfo}>
                <p className={styles.charName}>{lord.name}</p>
                <p className={styles.charDesc}>{lord.role}</p>
                <p className={styles.charLocation}>{lord.location}</p>
              </div>
            </div>
          ))}
        </div>
        <button className={styles.addCharButton} onClick={() => router.push('/create-lord')}>
          <span className={styles.plusIcon}>+</span> Добавить персонажа
        </button>
      </div>

      {/* Центральный дисплей персонажа */}
      {selectedLord && (
        <div className={styles.characterDisplay}>
          <Image src={selectedLord.avatar} alt={selectedLord.name} width={400} height={600} className={styles.mainCharImage} />
        </div>
      )}

      {/* Нижняя панель */}
      <div className={styles.bottomBar}>
        <div className={styles.goldInfo}>
          <p>Золото на сервере: 0</p>
          <div className={styles.goldButtons}>
            <button className={styles.goldButton}>Золото</button>
            <button className={styles.premiumButton}>Премиум</button>
          </div>
        </div>
        <button className={styles.playButton} onClick={handleEnterGame} disabled={!selectedLord}>
          Войти в игру
        </button>
      </div>
    </div>
  );
}