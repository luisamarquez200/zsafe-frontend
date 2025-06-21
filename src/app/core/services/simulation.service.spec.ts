import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SimulationService } from './simulation.service';
import { Zombie } from '../models/zombie.model';
import { Simulation } from '../models/simulation.model';
import { RegisterStrategyDto } from '../models/register-strategy.dto';

describe('SimulationService', () => {
  let service: SimulationService;
  let httpMock: HttpTestingController;

  const apiUrl = 'http://localhost:5176/api/defense';
  const apiKey = 'zsafe-secret-1234';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SimulationService]
    });
    service = TestBed.inject(SimulationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getOptimalStrategy with correct params and headers', () => {
    const bullets = 10;
    const seconds = 60;
    const mockResponse: Zombie[] = [];

    service.getOptimalStrategy(bullets, seconds).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${apiUrl}/optimal-strategy?bullets=${bullets}&secondsAvailable=${seconds}`
    );

    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('x-api-key')).toBe(apiKey);
    req.flush(mockResponse);
  });

  it('should call simulationStrategy and return Simulation result', () => {
    const bullets = 5;
    const seconds = 30;
    const mockResponse: Simulation = {
      id: 1,
      fecha: new Date().toISOString(),
      balasDisponibles: bullets,
      tiempoDisponible: seconds,
      eliminados: []
    };

    service.simulationStrategy(bullets, seconds).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${apiUrl}/simulate?bullets=${bullets}&secondsAvailable=${seconds}`
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('x-api-key')).toBe(apiKey);
    expect(req.request.body).toBeNull();
    req.flush(mockResponse);
  });

  it('should register real strategy with POST', () => {
    const dto: RegisterStrategyDto = {
      balasDisponibles: 3,
      tiempoDisponible: 20,
      zombieIds: [1, 2, 3]
    };

    const mockResponse: Simulation = {
      id: 2,
      fecha: new Date().toISOString(),
      balasDisponibles: 3,
      tiempoDisponible: 20,
      eliminados: []
    };

    service.registerRealStrategy(dto).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/register-strategy`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('x-api-key')).toBe(apiKey);
    expect(req.request.body).toEqual(dto);
    req.flush(mockResponse);
  });

  it('should get all simulations', () => {
    const mockResponse: Simulation[] = [
      {
        id: 1,
        fecha: new Date().toISOString(),
        balasDisponibles: 10,
        tiempoDisponible: 50,
        eliminados: []
      }
    ];

    service.getAllSimulations().subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/all-simulations`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('x-api-key')).toBe(apiKey);
    req.flush(mockResponse);
  });
});
