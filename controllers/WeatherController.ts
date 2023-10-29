import { Request, Response } from 'express';
import { geoCodingURL, getWeatherDataByCoordinates, getWeatherDataByLocation, weatherURL } from '../utils/function';

export default class WeatherController {
  static async getWeather(req: Request, res: Response) {
    const { lat, lon, location } = req.query;
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      res.status(500).json({
        success: false,
        message: 'Open Weather API key not found.'
      });
    }

    const weatherRequestURL: string = `${weatherURL}?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const geoCodingRequestURL: string = `${geoCodingURL}?q=${location}&limit=1&appid=${apiKey}`;

    if (lat && lon) {
      getWeatherDataByCoordinates(weatherRequestURL)
        .then(data => res.status(200).json({
          success: true,
          data
        }))
        .catch(error => res.status(500).json({
          success: false,
          message: error
        }));
    } else if (location) {
      getWeatherDataByLocation(geoCodingRequestURL)
        .then(data => res.status(200).json({
          success: true,
          data
        }))
        .catch(error => res.status(500).json({
          success: false,
          message: error
        }));
    } else {
      res.status(400).json({
        success: false,
        message: 'The provided information is not enough.'
      });
    }
  }
}