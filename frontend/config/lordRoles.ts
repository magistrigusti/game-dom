// frontend/config/lordRoles.ts

type Skill = {
  name: string;
  description: string;
};

type LordRole = {
  id: string;
  name: string;
  description: string;
  icon: string;
  avatar: string;
  skills: Skill[];
  perk: Skill;
};

const lordRoles: LordRole[] = [
  {
    id: "warlord",
    name: "Полководец",
    description: "Легендарный командир, вдохновляет армию на победу, усиливает боевые характеристики войск.",
    icon: "/lords/warlord-icon.png",
    avatar: "/lords/warlord-avatar.png",
    skills: [
      { name: "Тактическое превосходство", description: "Увеличивает атаку и защиту всех войск в бою." },
      { name: "Боевой клич", description: "Временно повышает мораль отряда, ускоряя действия." }
    ],
    perk: { name: "Грозный вдохновитель", description: "В начале боя все ваши войска получают бонус к урону." }
  },
  {
    id: "archmage",
    name: "Архимаг",
    description: "Владыка магии астрала, владеет разрушительными заклинаниями и защитой союзников.",
    icon: "/lords/archmage-icon.png",
    avatar: "/lords/archmage-avatar.png",
    skills: [
      { name: "Молния астрала", description: "Наносит массовый урон врагам на поле боя." },
      { name: "Астральный барьер", description: "Создаёт защитный щит для всей армии." }
    ],
    perk: { name: "Энергия портала", description: "Позволяет один раз мгновенно переместить армию между островами без затрат времени." }
  },
  {
    id: "ranger",
    name: "Следопыт",
    description: "Мастер разведки и выживания, идеально подходит для поиска ресурсов и засад.",
    icon: "/lords/ranger-icon.png",
    avatar: "/lords/ranger-avatar.png",
    skills: [
      { name: "Засада", description: "Первым наносит удар при встрече с врагом." },
      { name: "Острый глаз", description: "Находит скрытые ресурсы и ловушки на карте." }
    ],
    perk: { name: "Охотничий инстинкт", description: "Получает бонус к добыче ресурсов с любой точки астрала." }
  },
  {
    id: "templar",
    name: "Хранитель",
    description: "Щит мира, защитник островов и союзников. Специализируется на обороне и лечении.",
    icon: "/lords/templar-icon.png",
    avatar: "/lords/templar-avatar.png",
    skills: [
      { name: "Священная стена", description: "Повышает защиту армии на время битвы." },
      { name: "Благословение", description: "Лечит часть раненных войск после боя." }
    ],
    perk: { name: "Страж порядка", description: "Пассивно снижает потери войск в обороне и ускоряет восстановление зданий." }
  },
  {
    id: "alchemist",
    name: "Алхимик",
    description: "Мастер превращений и алхимии, увеличивает производство, улучшает армию и магию.",
    icon: "/lords/alchemist-icon.png",
    avatar: "/lords/alchemist-avatar.png",
    skills: [
      { name: "Зелье ускорения", description: "Ускоряет добычу ресурсов и строительство на острове." },
      { name: "Боевой эликсир", description: "Временно усиливает характеристики одного юнита." }
    ],
    perk: { name: "Трансмутация", description: "Может раз в сутки превратить любой один тип ресурса в другой." }
  },
  {
    id: "shadow",
    name: "Тень",
    description: "Великий интриган, мастер шпионажа, саботажа и внезапных атак.",
    icon: "/lords/shadow-icon.png",
    avatar: "/lords/shadow-avatar.png",
    skills: [
      { name: "Саботаж", description: "Замедляет добычу или развитие выбранного врага." },
      { name: "Невидимость", description: "Скрывает часть армии или самого лорда на один ход." }
    ],
    perk: { name: "Тайный агент", description: "Пассивно видит ближайшие действия противника и получает разведданные о карте." }
  }
];

export default lordRoles;
