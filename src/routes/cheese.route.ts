import { Router } from 'express';
import cheeseHandler from '../handlers/cheese.handler';

const cheeseRouter = () => {
  const router = Router();
  const handler = cheeseHandler();

  router.get('/', handler.get);
  router.get('/:id', handler.get);
  router.post('/', handler.create);
  router.patch('/:id', handler.update);
  router.delete('/:id', handler.remove);

  return router;
};

export default cheeseRouter;
