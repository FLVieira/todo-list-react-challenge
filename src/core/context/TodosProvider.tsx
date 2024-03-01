'use client';
import React, { FormEventHandler, createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/local-storage';

export type Todo = {
	name: string;
	done: boolean;
}

export type TodosContextProps = {
	todos: Todo[];
	filteredTodos: Todo[];
	currentTodo: string;
	setCurrentTodo: React.Dispatch<React.SetStateAction<string>>;
	handleTodoSubmit: FormEventHandler<HTMLFormElement> | undefined;
	handleCompleteTodo: (todo: Todo) => void;
	finishedTodosPercentage: number;
	pendingTodosPercentage: number;
}

export const TodosContext = createContext<TodosContextProps>({} as TodosContextProps);

type Props = {
  children: React.ReactNode;
};

const TODOS_LOCAL_STORAGE_KEY = '@todos'

export const TodosProvider = ({ children }: Props) => {
 	const [todos, setTodos] = useState<Todo[]>(() => {
		const savedTodos = getLocalStorage(TODOS_LOCAL_STORAGE_KEY);
		return savedTodos || [];
  	});

  	const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos.filter(todo => !todo.done))
	const [currentTodo, setCurrentTodo] = useState('');

  const handleTodoSubmit: FormEventHandler<HTMLFormElement> | undefined = (event) => {
    event.preventDefault();
    const newTodo = { done: false, name: currentTodo };
    setTodos([newTodo, ...todos]);
    setFilteredTodos([newTodo, ...filteredTodos]);
    setCurrentTodo('');
  };

	const completeTodosInList = useCallback((todosList: Todo[], todoToComplete: Todo) => {
		const notDoneTodos = todosList.filter(todo => !todo.done && todo.name !== todoToComplete.name);
		const doneTodos = todosList.filter(todo => todo.done);

		const updatedTodoToComplete = { ...todoToComplete, done: true };

		return [...notDoneTodos, ...doneTodos, updatedTodoToComplete];
	}, []);

	const handleCompleteTodo = useCallback(
		(todo: Todo) => {
			setTodos(prevTodos => completeTodosInList(prevTodos, todo));
			setFilteredTodos((prevFilteredTodos) => completeTodosInList(prevFilteredTodos, todo));
		},
		[completeTodosInList]
	);

  const cleanCompletedTodosFromList = () => {
    setFilteredTodos(todos.filter(todo => !todo.done));
  };

  const finishedTodosPercentage = useMemo(() => {
    const finishedTodosLength = todos.filter(todo => todo.done).length;
    return finishedTodosLength > 0 ? (finishedTodosLength / todos.length) * 100 : 0;
  }, [todos]);

  const pendingTodosPercentage = useMemo(() => {
    const pendingTodosLength = todos.filter(todo => !todo.done).length;
    return pendingTodosLength > 0 ? (pendingTodosLength / todos.length) * 100 : 0;
  }, [todos]);

  const store = {
		todos,
		filteredTodos,
		currentTodo,
		setCurrentTodo,
		handleTodoSubmit,
		handleCompleteTodo,
		finishedTodosPercentage,
		pendingTodosPercentage
	}

	useEffect(() => {
		const userHasACompletedTodo = todos.some(todo => todo.done);
		if (userHasACompletedTodo) {
			setTimeout(() => {
			cleanCompletedTodosFromList();
			}, 1000 * 30);
		}
  	}, [todos]);

	useEffect(() => {
    	setLocalStorage(TODOS_LOCAL_STORAGE_KEY, todos, 60 * 24 * 30);
  	}, [todos]);

  return (
    <TodosContext.Provider value={store}>
      {children}
    </TodosContext.Provider>
  );
};
