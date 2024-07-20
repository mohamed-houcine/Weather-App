import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'https://api.openweathermap.org/data/2.5';
  private apiKey = '1524b62246fc363c2811016a683def4f';

  constructor(private http: HttpClient) { }

  getCurrentWeather(city: string): Observable<any> {
    const encodedCity = encodeURIComponent(city);
    const url = `${this.apiUrl}/weather?q=${encodedCity}&appid=${this.apiKey}&units=metric`;
    return this.http.get<any>(url);
  }

  getWeeklyForecast(city: string): Observable<any> {
    const encodedCity = encodeURIComponent(city);
    const url = `${this.apiUrl}/forecast?q=${encodedCity}&appid=${this.apiKey}&units=metric`;
    return this.http.get<any>(url);
  }
}
