import { RichEmbed, Message } from 'discord.js';

export interface ResponseConfig {
  channel: string;
  useEmbed: boolean;
  embed: RichEmbed
}
export interface Context {
  responseConfig: ResponseConfig;
  msg: Message
}

export interface HeroUsage {
  name: string;
  playtime: string;
  image: string;
  percentage: number;
}

export interface CompAllHeroes {
  MeleeFinalBlows: string;
  SoloKills: string;
  ObjectiveKills: string;
  FinalBlows: string;
  DamageDone: string;
  Eliminations: string;
  Multikills: string;
  HealingDone: string;
  ReconAssists: string;
  Eliminations_MostinGame: string;
  FinalBlows_MostinGame: string;
  DamageDone_MostinGame: string;
  HealingDone_MostinGame: string;
  DefensiveAssists_MostinGame: string;
  OffensiveAssists_MostinGame: string;
  ObjectiveKills_MostinGame: string;
  ObjectiveTime_MostinGame: string;
  Multikill_Best: string;
  SoloKills_MostinGame: string;
  TimeSpentonFire_MostinGame: string;
  MeleeFinalBlows_Average: string;
  TimeSpentonFire_Average: string;
  SoloKills_Average: string;
  ObjectiveTime_Average: string;
  ObjectiveKills_Average: string;
  HealingDone_Average: string;
  FinalBlows_Average: string;
  Deaths_Average: string;
  DamageDone_Average: string;
  Eliminations_Average: string;
  Deaths: string;
  EnvironmentalDeaths: string;
  Cards: string;
  Medals: string;
  Medals_Gold: string;
  Medals_Silver: string;
  Medals_Bronze: string;
  GamesPlayed: string;
  GamesWon: string;
  TimeSpentonFire: string;
  ObjectiveTime: string;
  TimePlayed: string;
  MeleeFinalBlows_MostinGame: string;
  GamesTied: string;
  GamesLost: string;
  ReconAssists_MostinGame: string;
  OffensiveAssists: string;
  DefensiveAssists: string;
}

export interface Quick {
  wins: string;
}

export interface Competitive {
  wins: string;
  lost: number;
  played: string;
}

export interface Games {
  quick: Quick;
  competitive: Competitive;
}

export interface Playtime {
  quick: string;
  competitive: string;
}

export interface Competitive2 {
  rank: string;
  rank_img: string;
}

export interface Profile {
  username: string;
  level: number;
  games: Games;
  playtime: Playtime;
  avatar: string;
  competitive: Competitive2;
  levelFrame: string;
  star: string;
}

export interface HeroDetailsCommon {
  Card: string;
  Cards: string;
  DamageDone: string;
  DamageDone_Average: string;
  DamageDone_MostinGame: string;
  DamageDone_MostinLife: string;
  Deaths: string;
  Deaths_Average: string;
  Eliminations: string;
  Eliminations_Average: string;
  Eliminations_MostinGame: string;
  Eliminations_MostinLife: string;
  EliminationsperLife: string;
  FinalBlows: string;
  FinalBlows_Average: string;
  FinalBlows_MostinGame: string;
  GamesLost: string;
  GamesPlayed: string;
  GamesWon: string;
  KillStreak_Best: string;
  Medals: string;
  Medals_Bronze: string;
  Medals_Gold: string;
  Medals_Silver: string;
  ObjectiveKills: string;
  ObjectiveKills_Average: string;
  ObjectiveKills_MostinGame: string;
  ObjectiveTime: string;
  ObjectiveTime_Average: string;
  ObjectiveTime_MostinGame: string;
  SoloKills: string;
  SoloKills_Average: string;
  TimePlayed: string;
  TimeSpentonFire: string;
  WinPercentage: string;
  GamesTied: string;
}

export interface Wrapper<T> {
  data: T
}

export interface HeroDetails { 
  [name: string]: HeroDetailsCommon 
}