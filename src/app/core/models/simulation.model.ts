import { Zombie } from './zombie.model';
export interface Eliminado {
  zombieId: number;
  puntosObtenidos: number;
  timestamp: string;

  zombie: {
    id: number;
    tipo: string;
    puntaje: number;
    nivelAmenaza: number;
    tiempoDisparo: number;
    balasNecesarias: number;
  };
}


export interface Simulation {
  id: number;
  fecha: string;
  tiempoDisponible: number;
  balasDisponibles: number;
  eliminados: Eliminado[];
}
