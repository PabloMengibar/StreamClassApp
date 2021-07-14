import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Serie } from '../models/serie';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {

  private url = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getSeries(): Observable<Serie[]> {
    return this.http.get<Serie[]>(`${this.url}/series`).pipe(
      map(x => x.map(s => new Serie(s)))
    )
  }

  getSerieById(id: string): Observable<Serie> {
    return this.http.get<Serie>(`${this.url}/series/${id}`).pipe(
      map(x => new Serie(x))
    );
  }

  guardar(serie: Serie): Observable<Serie | null> {
    if (!serie) {
      return of(null);
    }

    // serie.id o serie??
    if (serie.id) {
      return this.http.put<Serie>(`${this.url}/series`, serie).pipe(
        map(s => new Serie(s))
      );
    }

    // CREAR SERIE
    return this.http.post<Serie>(`${this.url}/series/`, serie).pipe(
      map(s => new Serie(s))
    );
  }

  eliminar(id: string): Observable<boolean | null> {
    if (id) {
      return this.http.delete<any>(`${this.url}/series/${id}`, { observe: 'response' }).pipe(
        map(x => x.status === HttpStatusCode.NoContent)
      );
    }

    return of(null);
  }

}

