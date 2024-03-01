import { useContext } from 'react';
import { TodosContext } from '../context/TodosProvider';

export const useTodos = () => useContext(TodosContext);
