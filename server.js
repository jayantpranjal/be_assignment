import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import https from 'https';
dotenv.config();
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import rateLimit from 'express-rate-limit';
import blogRoutes from './routes/blogRoutes.js';

const port = process.env.PORT || 5000;

connectDB();

const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
});
app.use(limiter);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(notFound);
app.use(errorHandler);

const options = { 
  key: fs.readFileSync("server.key"), 
  cert: fs.readFileSync("server.cert"), 
}; 

https.createServer(options, app).listen(port, () => console.log(`Server started on port ${port}`));