import { bootstrapApplication } from '@angular/platform-browser';
import { SimulationFormComponent } from './app/modules/simulations/pages/simulation-form/simulation-form.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(SimulationFormComponent, {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideRouter(routes)
  ]
});
