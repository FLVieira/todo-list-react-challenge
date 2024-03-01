'use client';
import { TaskCounter } from "@/core/components/TaskCounter";
import { TaskForm } from "@/core/components/TaskForm";
import { TaskList } from "@/core/components/TaskList";
import { useTodos } from "@/core/hooks/useTodos";
import { getLocalStorage, setLocalStorage } from "@/core/utils/local-storage";
import { useEffect, useState } from "react";

const THEME_LOCAL_STORAGE_KEY = '@theme'

export default function Home() {
	const {
      todos,
      filteredTodos,
      currentTodo,
      setCurrentTodo,
      handleTodoSubmit,
      handleCompleteTodo,
      finishedTodosPercentage,
      pendingTodosPercentage
    } = useTodos();

	const [theme, setTheme] = useState<'light' | 'dark'>(() => {
		const savedTheme = (getLocalStorage(THEME_LOCAL_STORAGE_KEY) || 'light') as 'light' | 'dark';
		return savedTheme ?? 'light';
  	});

	const finishedColor = finishedTodosPercentage >= 50 ? 'text-lime-400' : 'text-rose-600';
	const pendingColor = pendingTodosPercentage >= 50 ? 'text-rose-600' : 'text-lime-400';

	const toggleTheme = () => {
    	setTheme(current => (current === 'light' ? 'dark' : 'light'));
   };

	useEffect(() => {
    	setLocalStorage(THEME_LOCAL_STORAGE_KEY, theme, 60 * 24 * 30);
  	}, [theme]);

	return (
		<main className={`${theme === 'dark' && 'dark'} max-w-[570px] p-8 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
			<ThemeToggle toggleTheme={toggleTheme} />
			<h1 className="text-center text-xl font-bold">LISTA DE TAREFAS</h1>
			<TaskCounter todosLength={todos.length} finishedTodosPercentage={finishedTodosPercentage} pendingTodosPercentage={pendingTodosPercentage} finishedColor={finishedColor} pendingColor={pendingColor} />
			<TaskForm currentTodo={currentTodo} setCurrentTodo={setCurrentTodo} handleTodoSubmit={handleTodoSubmit} />
			<TaskList filteredTodos={filteredTodos} handleCompleteTodo={handleCompleteTodo} />
		</main>
	);
}

const ThemeToggle = ({ toggleTheme }: {
	toggleTheme: () => void
}) => (
  <button onClick={toggleTheme} className="p-2 rounded bg-blue-500 text-white dark:bg-blue-700 dark:text-gray-200">
    Alternar Tema
  </button>
);