import { Request, Response } from 'express';
import QRCode from 'qrcode';
import fs from 'fs';
import { promisify } from 'util';
import cheeseController from '../controllers/cheese.controller';
import cheeseFactory from '../models/cheese.models';

const cheeseHandler = () => {
  const controller = cheeseController();
  const deleteFile = promisify(fs.unlink);

  const create = async (req: Request, res: Response) => {
    const { body } = req;
    let cheese;

    try {
      const newCheese = cheeseFactory({ ...body });
      const { id } = newCheese;

      await QRCode.toFile(
        `./src/codes/${id}.png`,
        `http://192.168.50.224:3000/cheeses/${id}`
      );

      cheese = await controller.insert({ cheese: newCheese });
    } catch (e: any) {
      return res.status(500).send({
        message: e.message,
      });
    }

    return res.send(cheese);
  };

  const get = async (req: Request, res: Response) => {
    const { params } = req;
    const { id } = params;
    let cheese;

    try {
      if (id) cheese = await controller.fetchById(id);
      else cheese = await controller.fetch();
    } catch (e: any) {
      return res.status(500).send({
        message: e.message,
      });
    }

    return res.send(cheese);
  };

  const update = async (req: Request, res: Response) => {
    const { body, params } = req;
    const { id } = params;
    let cheese;

    try {
      cheese = await controller.update({ id, update: body });
    } catch (e: any) {
      return res.status(500).send({
        message: e.message,
      });
    }

    return res.send(cheese);
  };

  const remove = async (req: Request, res: Response) => {
    const { params } = req;
    const { id } = params;
    let cheese;

    try {
      cheese = await controller.fetchById(id);
      await controller.remove(id);
      await deleteFile(`./src/codes/${id}.png`);
    } catch (e: any) {
      return res.status(500).send({
        message: e.message,
      });
    }

    return res.send(cheese);
  };

  return {
    create,
    get,
    update,
    remove,
  };
};

export default cheeseHandler;
