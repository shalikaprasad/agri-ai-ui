import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CropPredictionService {

  private baseUrl = 'http://localhost:8084/api/crop_prediction';

  constructor(private http: HttpClient) {}

  public getCropPredictionResult(cropDetails) {
    return this.http.post(`${this.baseUrl}/getCropPredictionResult`, cropDetails);
  }

  public getBestCropResult(cropDetails) {
    return this.http.post(`${this.baseUrl}/getBestCropResult`, cropDetails);
  }
}
