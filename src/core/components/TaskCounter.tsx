type Props = {
	todosLength: number;
	finishedTodosPercentage: number;
	pendingTodosPercentage: number;
	finishedColor: string;
	pendingColor: string;
}

export const TaskCounter = ({ todosLength, finishedTodosPercentage, pendingTodosPercentage, finishedColor, pendingColor }: Props) => (
  <div className='flex flex-row justify-between gap-2 items-center py-4 mt-8 px-8'>
    <div className='flex flex-col'>
      <span className="text-md font-bold dark:text-gray-300">Total de tarefas</span>
      <b className="text-4xl">{todosLength}</b>
    </div>
    <div className='flex flex-col'>
      <span className="text-md font-bold dark:text-gray-300">Concluídas</span>
      <b className={`text-4xl ${finishedColor}`}>{finishedTodosPercentage.toFixed(2)}%</b>
    </div>
    <div className='flex flex-col'>
      <span className="text-md font-bold dark:text-gray-300">Pendentes</span>
      <b className={`text-4xl ${pendingColor}`}>{pendingTodosPercentage.toFixed(2)}%</b>
    </div>
  </div>
);