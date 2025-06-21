import { Routes } from '@angular/router';
import { SimulationFormComponent } from './modules/simulations/pages/simulation-form/simulation-form.component';
import { SimulationRankingComponent } from './modules/simulations/pages/simulation-ranking/simulation-ranking.component';
import { StrategyFormComponent } from './modules/simulations/pages/strategy-form/strategy-form.component';

export const routes: Routes = [
  {
    path: '',
    component: SimulationFormComponent
  },
  {
    path: 'estrategia',
    component: StrategyFormComponent
  }
];
