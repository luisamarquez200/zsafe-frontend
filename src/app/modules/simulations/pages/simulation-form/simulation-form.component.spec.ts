import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimulationFormComponent } from './simulation-form.component';
import { SimulationService } from '../../../../core/services/simulation.service';
import { of, throwError } from 'rxjs';
import { Simulation } from '../../../../core/models/simulation.model';

describe('SimulationFormComponent', () => {
  let component: SimulationFormComponent;
  let fixture: ComponentFixture<SimulationFormComponent>;
  let simulationService: SimulationService;

  const mockSimulationResponse: Simulation = {
    id: 1,
    fecha: new Date().toISOString(),
    tiempoDisponible: 90,
    balasDisponibles: 30,
    eliminados: [
      {
        zombieId: 1,
        zombie: {
          id: 101,
          tipo: 'Rápido',
          balasNecesarias: 2,
          tiempoDisparo: 3,
          puntaje: 10,
          nivelAmenaza: 2
        },     
        timestamp: '1',   
        puntosObtenidos: 10
      }
    ]
  };

  const mockSimulationHistory: Simulation[] = [
    {
      id: 2,
      fecha: new Date().toISOString(),
      tiempoDisponible: 60,
      balasDisponibles: 20,
      eliminados: [
        {
          zombieId: 2,
          zombie: {
            id: 102,
            tipo: 'Lento',
            balasNecesarias: 1,
            tiempoDisparo: 2,
            puntaje: 5,
            nivelAmenaza: 1
          },
          timestamp: '1',
          puntosObtenidos: 5
        }
      ]
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SimulationFormComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SimulationFormComponent);
    component = fixture.componentInstance;
    simulationService = TestBed.inject(SimulationService);
    spyOn(simulationService, 'getAllSimulations').and.returnValue(of(mockSimulationHistory));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.form.value).toEqual({
      bullets: 30,
      secondsAvailable: 90
    });
  });

  it('should not call simulationStrategy if form is invalid', () => {
    spyOn(simulationService, 'simulationStrategy');
    component.form.patchValue({ bullets: 0 }); // inválido
    component.submit();
    expect(simulationService.simulationStrategy).not.toHaveBeenCalled();
  });
  

  it('should handle error in submit()', () => {
    const errorSpy = spyOn(console, 'error');
    spyOn(simulationService, 'simulationStrategy').and.returnValue(
      throwError(() => new Error('submit error'))
    );

    component.submit();

    expect(errorSpy).toHaveBeenCalledWith('Error al simular:', jasmine.any(Error));
    expect(component.loading).toBeFalse();
  });

  it('should fetch simulation history on refetchSimulationHistory()', () => {
    component.simulationHistory = [];
    component.refetchSimulationHistory();
    expect(component.simulationHistory.length).toBe(1);
  });

  it('should handle error in refetchSimulationHistory()', () => {
    const errorSpy = spyOn(console, 'error');
    (simulationService.getAllSimulations as jasmine.Spy).and.returnValue(
      throwError(() => new Error('history error'))
    );

    component.refetchSimulationHistory();

    expect(errorSpy).toHaveBeenCalledWith('Error al refrescar historial:', jasmine.any(Error));
  });
});