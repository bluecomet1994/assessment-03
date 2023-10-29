import axios from "axios";

export const weatherURL: string = 'https://api.openweathermap.org/data/2.5/onecall';
export const geoCodingURL: string = 'https://api.openweathermap.org/geo/1.0/direct';

export function checkWeatherAlert(weatherData: any) {
  if (weatherData.alerts && weatherData.alerts.length > 0) {
    const alertMessage = weatherData.alerts[0].event;
    return alertMessage;
  } else {
    return 'No active weather alerts.';
  }
}

export async function getWeatherDataByCoordinates(url: string) {
  try {
    const fetch = await import('node-fetch');
    const response = await fetch.default(url);
    const data: any = response.json();
    const weatherCondition = data.current.weather[0].main;
    const temperature = data.current.temp;
    const weatherAlert = checkWeatherAlert(data);

    return { weatherCondition, temperature, weatherAlert };
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getWeatherDataByLocation(url: string) {
  try {
    const fetch = await import('node-fetch');
    const response = await fetch.default(url);
    const data: any = response.json();


    if (data.length > 0) {
      const { lat, lon } = data[0];
      const apiKey = process.env.API_KEY;
      const weatherRequestURL: string = `${weatherURL}?lat=${lat}&lon=${lon}&appid=${apiKey}`;

      return getWeatherDataByCoordinates(weatherRequestURL);
    } else {
      throw new Error('Invalid location or coordinates not found.');
    }
  } catch (error: any) {
    throw new Error(error.response.data);
  }
}