import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../shared/material.modules';
import { Simulation } from '../../../../core/models/simulation.model';
import { SimulationService } from '../../../../core/services/simulation.service';
import { RegisterStrategyDto } from '../../../../core/models/register-strategy.dto';

@Component({
  selector: 'app-strategy-form',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './strategy-form.component.html',
  styleUrls: ['./strategy-form.component.scss']
})
export class StrategyFormComponent {
  @Input() simulation!: Simulation;

  @Output() strategyRegistered = new EventEmitter<void>();

  balasDisponibles: number = 30;
  tiempoDisponible: number = 90;
  selectedZombieIds: number[] = [];

  displayedColumns: string[] = [
    'zombieId', 'tipo', 'balas', 'tiempo', 'puntaje', 'amenaza', 'obtenido'
  ];

  constructor(private simulationService: SimulationService) {}

  get puntajeTotal(): number {
    return this.simulation?.eliminados?.reduce((acc, e) => acc + e.puntosObtenidos, 0) ?? 0;
  }

  registrarEstrategiaReal(): void {
    const dto: RegisterStrategyDto = {
      balasDisponibles: this.balasDisponibles,
      tiempoDisponible: this.tiempoDisponible,
      zombieIds: this.selectedZombieIds
    };

    this.simulationService.registerRealStrategy(dto).subscribe({
      next: (res) => {
        this.strategyRegistered.emit(); 
      },
      error: (err) => {
        console.error('Error al registrar estrategia:', err);
      }
    });
  }
}