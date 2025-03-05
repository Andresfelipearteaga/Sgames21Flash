import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { checkConnection } from './config/db';


dotenv.config();

const app = express();
const PORT = 5000;
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());


checkConnection().then(() => {
app.listen(PORT, () => { 
    console.log(`Servidor Corriendo ${PORT}`);
    });
});