import type {NextApiRequest, NextApiResponse} from 'next';
import { Todo } from "../../../../models/Todo"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = String(req.query.id);
  if (req.method === 'GET') {
    const todo = await Todo.find(id)
    if (!todo) {
      res.status(404).json({ message: 'Todo not found' });
      return;
    }

    res.status(200).json(todo);

  } else if (req.method === 'PUT') {
    const {id, title, completed} = req.body;
    const updatedTodo = await Todo.update(
      id,
      title,
      completed
    )
    res.status(200).json(updatedTodo);
  } else if (req.method === 'DELETE') {
    await Todo.delete(id);
    res.status(204).end();
  } else {
    res.status(405).end();
  }
}
