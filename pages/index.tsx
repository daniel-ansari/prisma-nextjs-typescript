import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {useState} from 'react';
import {
  deleteTodo,
  getTodos,
  createTodo,
  updateTodo
} from "../services/TodoService";
import {Todo} from '@prisma/client';
import { useRouter } from 'next/router';


const Home: NextPage<{ todos: Todo[] }> = ({todos = []}) => {
  const router = useRouter();
  const [newTodo, setNewTodo] = useState('');
  const handleNewTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const refreshData = () => {
    router.replace(router.asPath);
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const todo = await createTodo({
      title: newTodo,
      completed: false
    } as Todo)
    refreshData();
    setNewTodo('');
    console.log('New todo created:', todo);
  };

  const handleTodoUpdate = async (id: string, title: string, completed: boolean) => {
    await updateTodo({id, title, completed})
    refreshData();
    console.log(`Todo ${id} is ${completed ? 'done' : 'not done'}`);
  };

  const handleTodoDelete = async (id: string) => {
    await deleteTodo(id)
    refreshData();
    console.log(`Todo ${id} deleted`);
  };

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main
        className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">

        <div
          className="mt-6 max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <h1 className="text-6xl font-bold">My Todos</h1>
          <form onSubmit={handleFormSubmit} className="mb-4">
            <div className="flex mt-4">
              <input type="text" value={newTodo}
                     onChange={handleNewTodoChange} className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"/>
              <button type="submit" className="flex-no-shrink p-2 border-2 rounded text-blue-500 border-blue-500 hover:text-white hover:bg-blue-400">Add</button>
            </div>
          </form>
            {todos.map((todo) => (
              <div className="flex mb-4 items-center" key={todo.id}>
                <label className="w-full text-grey-darkest flex items-center">
                  <input
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleTodoUpdate(todo.id, todo.title, !todo.completed)}
                  />
                  <span className={todo.completed ? 'ml-2 line-through' : 'ml-2'}>
                    {todo.title}
                  </span>
                </label>
                <button onClick={() => handleTodoDelete(todo.id)} className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-500 border-red-500 hover:text-white hover:bg-red-400">
                  Delete
                </button>
              </div>
            ))}
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16}/>
        </a>
      </footer>
    </div>
  )
}

export const getServerSideProps = async () => {
  try {
    const todos = await getTodos();
    return {
      props: {
        todos: todos ? todos : [],
      },
    };
  } catch (e) {
    console.log('ERROR', e)
    return {
      props: {
        todos: [],
      },
    }
  }
};

export default Home
