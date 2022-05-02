import axios from 'axios';
import { Cheese } from '../models/cheese.models';

const cheeseController = () => {
  const baseUrl = 'http://localhost:3001/cheeses';

  const insert = async ({ cheese }: { cheese: Cheese }) => {
    const { data } = await axios.post(baseUrl, cheese);
    return data;
  };

  const fetch = async () => {
    const { data } = await axios.get(baseUrl);
    return data;
  };

  const fetchById = async (id: string) => {
    const { data } = await axios.get(`${baseUrl}/${id}`);
    return data;
  };

  const update = async ({
    id,
    update,
  }: {
    id: string;
    update: Partial<Cheese>;
  }) => {
    const { data } = await axios.patch(`${baseUrl}/${id}`, update);
    return data;
  };

  const remove = async (id: string) => {
    const { data } = await axios.delete(`${baseUrl}/${id}`);
    return data;
  };

  return {
    insert,
    fetch,
    fetchById,
    update,
    remove,
  };
};

export default cheeseController;
