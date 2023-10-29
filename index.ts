import * as express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import apiRouter from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', apiRouter);

app.listen(port, () => console.log(`>> Server listening on ${port}.`));