import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimulationRankingComponent } from './simulation-ranking.component';

describe('SimulationRankingComponent', () => {
  let component: SimulationRankingComponent;
  let fixture: ComponentFixture<SimulationRankingComponent>;

  const mockSimulationWith$values = {
    eliminados: {
      $values: [
        { puntosObtenidos: 10 },
        { puntosObtenidos: 20 }
      ]
    }
  } as any;

  const mockSimulationWithout$values = {
    eliminados: [
      { puntosObtenidos: 5 },
      { puntosObtenidos: 15 }
    ]
  } as any;

  const mockSimulationInvalid = {
    eliminados: null
  } as any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulationRankingComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SimulationRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return eliminados from $values if present', () => {
    const result = component.getEliminados(mockSimulationWith$values);
    expect(result.length).toBe(2);
    expect(result[0].puntosObtenidos).toBe(10);
  });

  it('should return eliminados array directly if no $values', () => {
    const result = component.getEliminados(mockSimulationWithout$values);
    expect(result.length).toBe(2);
    expect(result[1].puntosObtenidos).toBe(15);
  });

  it('should return empty array if eliminados is invalid', () => {
    const result = component.getEliminados(mockSimulationInvalid);
    expect(result).toEqual([]);
  });

  it('should calculate score correctly with $values', () => {
    const score = component.getScore(mockSimulationWith$values);
    expect(score).toBe(30);
  });

  it('should calculate score correctly with array eliminados', () => {
    const score = component.getScore(mockSimulationWithout$values);
    expect(score).toBe(20);
  });

  it('should sort simulations by score in descending order', () => {
    component.simulation = [
      mockSimulationWithout$values, 
      mockSimulationWith$values    
    ];
    const sorted = component.sortedSimulation;
    expect(sorted[0]).toBe(mockSimulationWith$values);
  });
});