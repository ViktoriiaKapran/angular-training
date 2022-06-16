import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HOST } from '../constants/urls';
import { PaintingResponse } from '../models/painting-response';
import { PaintingsResponse } from '../models/paintings-response';

@Injectable({
  providedIn: 'root'
})
export class PaintingService {


  constructor(private http: HttpClient) { }

  getPaintings(): Observable<PaintingsResponse> {
    return this.http.get<PaintingsResponse>(HOST + '/paintings');
  }

  getPaintingById(paintingId): Observable<PaintingResponse>  {
    return this.http.get<PaintingResponse>(HOST + '/paintings/' + paintingId);
  }
}
