import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SimulationService } from '../../../../core/services/simulation.service';
import { MaterialModule } from '../../../../shared/material.modules';
import { StrategyFormComponent } from "../strategy-form/strategy-form.component";
import { CommonModule } from '@angular/common';
import { Simulation } from '../../../../core/models/simulation.model';
import { SimulationRankingComponent } from '../simulation-ranking/simulation-ranking.component';

@Component({
  selector: 'app-simulation-form',
  standalone: true,
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    StrategyFormComponent,
    SimulationRankingComponent,
    CommonModule
  ],
  templateUrl: './simulation-form.component.html',
  styleUrls: ['./simulation-form.component.scss']
})
export class SimulationFormComponent {
  form: FormGroup;
  simulationResult: Simulation | null = null;
  simulationHistory: Simulation[] = [];
  totalScore = 0;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private simulationService: SimulationService
  ) {
    this.form = this.fb.group({
      bullets: [30, [Validators.required, Validators.min(1)]],
      secondsAvailable: [90, [Validators.required, Validators.min(1)]]
    });

    this.refetchSimulationHistory();
  }

  submit(): void {
    if (this.form.invalid) return;
    this.loading = true;

    const { bullets, secondsAvailable } = this.form.value;

    this.simulationService.simulationStrategy(bullets, secondsAvailable).subscribe({
      next: (res) => {
        const eliminadosRaw = (res.eliminados as any)?.$values ?? [];
        this.simulationResult = {
          ...res,
          eliminados: eliminadosRaw
        };
        this.refetchSimulationHistory();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al simular:', err);
        this.loading = false;
      }
    });
  }

  refetchSimulationHistory(): void {
    this.simulationService.getAllSimulations().subscribe({
      next: (data) => {
        const list = (data as any)?.$values ?? data;
        this.simulationHistory = list;
      },
      error: (err) => {
        console.error('Error al refrescar historial:', err);
      }
    });
  }
}
