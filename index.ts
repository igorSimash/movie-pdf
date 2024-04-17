import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import movieToPdf from './routes/pdf/movie-to-pdf'

const app = express();

app.use(cors({credentials: true, origin: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', movieToPdf);

const port = process.env.PORT ?? 5000;
app.listen(port, () => console.log('Listening on port ' + port));