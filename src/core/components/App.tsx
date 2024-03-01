'use client';
import { TodosProvider } from "../context/TodosProvider";

type Props = {
  children: React.ReactNode;
};

export const App = ({ children }: Props) => {
	return (
		<TodosProvider>
			{children}
		</TodosProvider>
	)
}