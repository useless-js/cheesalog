import express from 'express';
import cheeseRouter from './routes/cheese.route';

(async () => {
  const app = express();

  app.use(express.json());

  app.use('/cheeses', cheeseRouter());

  app.get('/', (_, res) => {
    res.send('ok');
  });

  app.get('/*', (_, res) => {
    res.send('This is not the cheese that you are looking for.');
  });

  app.listen(3000, '0.0.0.0', () => {
    console.log('Cheesalog is listening on port 3000');
  });
})();
