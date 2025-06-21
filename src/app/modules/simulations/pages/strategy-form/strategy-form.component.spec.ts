import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StrategyFormComponent } from './strategy-form.component';
import { SimulationService } from '../../../../core/services/simulation.service';
import { Simulation } from '../../../../core/models/simulation.model';
import { of, throwError } from 'rxjs';
import { Component } from '@angular/core';

describe('StrategyFormComponent', () => {
  let component: StrategyFormComponent;
  let fixture: ComponentFixture<StrategyFormComponent>;
  let simulationServiceSpy: jasmine.SpyObj<SimulationService>;

  const mockSimulation: Simulation = {
    id: 1,
    fecha: new Date().toISOString(),
    tiempoDisponible: 90,
    balasDisponibles: 30,
    eliminados: [
      {
        zombieId: 101,
        zombie: {
          tipo: 'Rápido',
          balasNecesarias: 3,
          tiempoDisparo: 4,
          puntaje: 10,
          nivelAmenaza: 2
        },
        puntosObtenidos: 10
      },
      {
        zombieId: 102,
        zombie: {
          tipo: 'Lento',
          balasNecesarias: 2,
          tiempoDisparo: 3,
          puntaje: 15,
          nivelAmenaza: 1
        },
        puntosObtenidos: 15
      }
    ]
  } as any;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('SimulationService', ['registerRealStrategy']);

    await TestBed.configureTestingModule({
      imports: [StrategyFormComponent],
      providers: [{ provide: SimulationService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(StrategyFormComponent);
    component = fixture.componentInstance;
    simulationServiceSpy = TestBed.inject(SimulationService) as jasmine.SpyObj<SimulationService>;

    component.simulation = mockSimulation;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total score (puntajeTotal)', () => {
    expect(component.puntajeTotal).toBe(25); // 10 + 15
  });

  it('should emit strategyRegistered when register succeeds', () => {
    simulationServiceSpy.registerRealStrategy.and.returnValue(of(mockSimulation));
    spyOn(component.strategyRegistered, 'emit');

    component.selectedZombieIds = [101, 102];
    component.balasDisponibles = 40;
    component.tiempoDisponible = 120;

    component.registrarEstrategiaReal();

    expect(simulationServiceSpy.registerRealStrategy).toHaveBeenCalledWith({
      balasDisponibles: 40,
      tiempoDisponible: 120,
      zombieIds: [101, 102]
    });

    expect(component.strategyRegistered.emit).toHaveBeenCalled();
  });

  it('should log error when register fails', () => {
    const consoleSpy = spyOn(console, 'error');
    simulationServiceSpy.registerRealStrategy.and.returnValue(
      throwError(() => new Error('simulated error'))
    );

    component.selectedZombieIds = [999];
    component.registrarEstrategiaReal();

    expect(consoleSpy).toHaveBeenCalledWith(
      'Error al registrar estrategia:',
      jasmine.any(Error)
    );
  });
});