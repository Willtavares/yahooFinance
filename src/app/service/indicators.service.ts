import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IndicatorsService {
  URL =
    'https://query2.finance.yahoo.com/v8/finance/chart/PETR4.SA?range=3mo&interval=1d&indicators=quote&includeTimestamps=true';

  constructor(private http: HttpClient) {}

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.URL);
  }
}
