import { WeatherService } from '../weather.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core'; // Import OnInit

@Component({
  selector: 'app-weather-card',
  standalone: true,
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css'], // Corrected to styleUrls
  imports: [FormsModule, CommonModule, HttpClientModule],
  providers: [WeatherService]
})
export class WeatherCardComponent implements OnInit {

  city: string = 'Tozeur'; // Set default city to Tozeur
  temperature: number = 0;
  rainIntensity: number = 0;
  weatherData: any;
  weather: string = '';
  week: string = '';
  hourlyForecast: any[] = [];
  weeklyForecast: any[] = [];
  forecastData: any;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getWeather(); // Fetch weather data for default city on initialization
  }

  getWeather(): void {
    this.weatherService.getCurrentWeather(this.city).subscribe((weather: any) => {
      this.weatherData = weather;
      console.log('Current Weather:', weather);
      this.temperature = this.weatherData?.main.temp;
      this.rainIntensity = this.weatherData?.rain?.['1h'] || 0;
      this.weather = this.weatherData?.weather[0].main;
    });

    this.weatherService.getWeeklyForecast(this.city).subscribe((week: any) => {
      this.forecastData = week;
      console.log('Weekly Forecast:', week);
    });
  }

  getSlides(): any[] {
    if (!this.forecastData) return [];
    const slides = [];

    for (let i = 0; i < this.forecastData.list.length; i += 6) {
      slides.push(this.forecastData.list.slice(i, i + 6));
    }

    return slides;
  }

  getWeatherIconSrc(weather: string): string {
    switch (weather) {
      case 'Clear':
        return 'assets/icons/clear.png'; // Clear weather
      case 'Clouds':
        return 'assets/icons/clouds.png'; // Cloudy weather
      case 'Rain':
        return 'assets/icons/rain.png'; // Rainy weather
      case 'Snow':
        return 'assets/icons/snow.png'; // Snowy weather
      case 'Mist':
        return 'assets/icons/mist.png'; // Misty weather
      default:
        return 'assets/icons/default.png'; // Default icon for unknown weather
    }
  }
}
