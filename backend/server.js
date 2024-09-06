import express from 'express';
import data from './data.js';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect('mongodb://127.0.0.1/e-commerce')
  .then(() => {
    console.log('Connected Successfully...');
  })
  .catch((err) => console.log('Sorry for Error: ', err));

app.get('/api/products', (req, res) => {
  res.send(data.products);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serve at  http://localhost:${port}`);
});
