import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HOST } from '../constants/urls';
import { PaintingResponse } from '../models/painting-response';
import { PaintingsParameters } from '../models/paintings-parameters';
import { PaintingsResponse } from '../models/paintings-response';

@Injectable({
  providedIn: 'root'
})
export class PaintingService {


  constructor(private http: HttpClient) { }

  getPaintings(param?: any): Observable<PaintingsResponse> {
    return this.http.get<PaintingsResponse>(HOST + '/paintings', {params: param});
  }

  getPaintingById(paintingId): Observable<PaintingResponse>  {
    return this.http.get<PaintingResponse>(HOST + '/paintings/' + paintingId);
  }

  getPaintingsParameters(): Observable<PaintingsParameters> {
    return this.http.get<PaintingsParameters>(HOST + '/paintings/parameters');
  }
}
