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
  @Input() simulation : Simulation [] =[];

  getScore(simulation : Simulation): number{
    return simulation.eliminados.reduce((sum, e) => sum + e.puntosObtenidos, 0)
  }

  get sortedSimulation(): Simulation[]{
    return [...this.simulation].sort((a,b) => this.getScore(b) - this.getScore(a));
  }

}
