import { FormEventHandler } from "react";

type Props = {
	currentTodo: string;
	setCurrentTodo: (val: string) => void;
	handleTodoSubmit: FormEventHandler<HTMLFormElement> | undefined;
}

export const TaskForm = ({ currentTodo, setCurrentTodo, handleTodoSubmit }: Props) => (
  <form name="todo-form" className='mt-8 flex flex-row gap-4 ' onSubmit={handleTodoSubmit}>
    <input value={currentTodo} onChange={(e) => setCurrentTodo(e.target.value)} type="text" placeholder='Escreva uma nova tarefa' className='w-3/5 border-gray-400 border rounded-md p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200' />
    <button type="submit" className='w-2/5 bg-[#4F46E5] text-white font-bold rounded-md dark:bg-[#5B21B6] dark:text-gray-200'>ADICIONAR</button>
  </form>
);