import express from 'express';
import http from 'http';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { Bootstrap } from './Modules/bootstrap';
import { dbconn } from './DataBase/dbConnection'; 
import path from 'path';
const app = express();
const port = 8080; 

app.use(express.json());
app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));
Bootstrap(app);
app.get('/', (req: express.Request, res: express.Response) => {
  res.send(`<h1>Hi</h1>`);
});
dbconn
  .then(() => {
    console.log('Database connected successfully');

    const server = http.createServer(app);

    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });
