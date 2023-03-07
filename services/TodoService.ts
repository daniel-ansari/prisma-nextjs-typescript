import {Todo} from '@prisma/client';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URI}/api/v1/todos`;
const headers = new Headers({
  'User-Agent': '*',
  'Content-Type': 'application/json'
})
export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(BASE_URL, {
    method: 'GET',
    headers
  })
  return response.json();
};

export const createTodo = async (todo: Todo): Promise<Todo> => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(todo),
  });
  return response.json();
};

export const updateTodo = async (todo: Todo): Promise<Todo> => {
  const response = await fetch(`${BASE_URL}/${todo.id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(todo),
  });
  return response.json();
};

export const deleteTodo = async (id: string): Promise<void> => {
  await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers
  });
};
