import type { NextApiRequest, NextApiResponse } from 'next';
import { Todo } from "../../../../models/Todo"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('req.method', req.method)
  if (req.method === 'GET') {
    const data = await Todo.getAll()
    return res.status(200).json( data || [] );
  } else if (req.method === 'POST') {
    const { title } = req.body;
    const data = await Todo.create(title)
  console.log('data', data)
    if (!data)
      return res.status(400).json( 'Error in creating todo' );

    return res.status(201).json( data );
  } else {
    res.status(405).json({ message: `HTTP method ${req.method ?? 'unknown'} not allowed` });
  }
};

export default handler;

