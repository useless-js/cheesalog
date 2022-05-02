import uuid from 'uniqid';

interface ICheeseFactoryArgs {
  name: string;
  date: string;
  opened?: boolean;
}

export type Cheese = {
  id: string;
  name: string;
  date: Date;
  ts: number;
  opened: boolean;
};

const cheeseFactory = ({
  name,
  date,
  opened = false,
}: ICheeseFactoryArgs): Cheese => {
  if (!name || !name.length)
    throw new Error('You must include a valid name for your cheese!');
  if (!date || date.split('/').length !== 3)
    throw new Error('You must include a date with format <mm/dd/yyyy>.');

  const id = uuid();
  const [month, day, year] = date.split('/');
  return Object.freeze({
    id,
    name: name.toLowerCase(),
    date: new Date(parseInt(year), parseInt(month) - 1, parseInt(day)),
    ts: new Date().getTime(),
    opened,
  });
};

export default cheeseFactory;
