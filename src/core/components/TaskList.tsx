import { Todo } from "../context/TodosProvider";

type Props = {
	filteredTodos: Todo[];
	handleCompleteTodo: (val: Todo) => void;
}

export const TaskList = ({ filteredTodos, handleCompleteTodo }: Props) => {
	const sortTodos = (a: Todo, b: Todo) => {
		if (!a.done && b.done) {
			return -1;
		}

		else if (a.done && !b.done) {
			return 1;
		}

		return 0;
	}

	return (
  	<div className='mt-12'>
    {filteredTodos.sort(sortTodos).map((todo, index) => (
      <div key={index} className={`${todo.done ? 'border-gray-200 dark:border-gray-700' : 'border-gray-400 dark:border-gray-600'} border rounded-md py-4 pr-1 pl-4 flex flex-row items-center justify-between mb-6 min-h-[88px]`}>
        <span className={`${todo.done ? 'text-gray-300 dark:text-gray-500' : 'text-black dark:text-white'}`}>{todo.name}</span>
        {!todo.done && (
          <button onClick={() => handleCompleteTodo(todo)} className="bg-[#16A34A] font-bold text-white rounded-md p-4 mr-2 dark:bg-[#15803d] dark:text-gray-200">COMPLETAR</button>
        )}
      </div>
    ))}
  </div>
)};
