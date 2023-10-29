import * as express from 'express';
import WeatherController from '../controllers/WeatherController';

const router: express.Router = express.Router();

router.get('/weather', WeatherController.getWeather);

export default router;