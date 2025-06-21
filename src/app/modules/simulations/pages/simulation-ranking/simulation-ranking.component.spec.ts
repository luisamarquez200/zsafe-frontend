import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationRankingComponent } from './simulation-ranking.component';

describe('SimulationRankingComponent', () => {
  let component: SimulationRankingComponent;
  let fixture: ComponentFixture<SimulationRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulationRankingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimulationRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
