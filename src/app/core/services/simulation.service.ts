import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Zombie } from '../models/zombie.model';
import { Simulation } from '../models/simulation.model';
import { RegisterStrategyDto } from '../models/register-strategy.dto';

@Injectable({
  providedIn: 'root'
})
export class SimulationService {
  private apiUrl = 'https://zsafe-defense.onrender.com/api/defense';
  private apiKey = 'zsafe-secret-1234';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('x-api-key', this.apiKey);
  }

  /**
   * Obtiene la mejor estrategia sin guardar en base de datos.
   */
  getOptimalStrategy(bullets: number, secondsAvailable: number): Observable<Zombie[]> {
    const headers = this.getHeaders();
    const params = new HttpParams()
      .set('bullets', bullets)
      .set('secondsAvailable', secondsAvailable);

    return this.http.get<Zombie[]>(`${this.apiUrl}/optimal-strategy`, { headers, params });
  }

  /**
   * Ejecuta una simulación y la guarda en base de datos.
   */
  simulationStrategy(bullets: number, secondsAvailable: number): Observable<Simulation> {
    const headers = this.getHeaders();
    const params = new HttpParams()
      .set('bullets', bullets)
      .set('secondsAvailable', secondsAvailable);

    return this.http.post<Simulation>(`${this.apiUrl}/simulate`, null, { headers, params });
  }

  /**
   * Registra una estrategia real elegida manualmente por el usuario.
   */
  registerRealStrategy(dto: RegisterStrategyDto): Observable<Simulation> {
    const headers = this.getHeaders();
    return this.http.post<Simulation>(`${this.apiUrl}/register-strategy`, dto, { headers });
  }

  /**
   * Consulta todas las simulaciones registradas (para el ranking).
   */
  getAllSimulations(): Observable<Simulation[]> {
    const headers = this.getHeaders();
    return this.http.get<Simulation[]>(`${this.apiUrl}/all-simulations`, { headers });
  }
}