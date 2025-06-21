import { Component, Input } from '@angular/core';
import { Simulation } from '../../../../core/models/simulation.model';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../shared/material.modules';

@Component({
  selector: 'app-simulation-ranking',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './simulation-ranking.component.html',
  styleUrl: './simulation-ranking.component.scss'
})
export class SimulationRankingComponent {
  @Input() simulation: Simulation[] = [];

  getEliminados(sim: Simulation): any[] {
    const eliminados: any = sim.eliminados;
    return Array.isArray(eliminados?.$values)
      ? eliminados.$values
      : Array.isArray(eliminados)
        ? eliminados
        : [];
  }


  getScore(sim: Simulation): number {
    return this.getEliminados(sim).reduce((acc, z) => acc + z.puntosObtenidos, 0);
  }

  get sortedSimulation(): Simulation[] {
    return [...this.simulation].sort((a, b) => this.getScore(b) - this.getScore(a));
  }
}