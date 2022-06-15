import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Painting } from '../models/painting';
import { PaintingsResponse } from '../models/paintings-response';

@Injectable({
  providedIn: 'root'
})
export class PaintingService {

  host = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getPaintings(): Observable<PaintingsResponse> {
    return this.http.get<PaintingsResponse>(this.host + '/paintings');
  }
}
