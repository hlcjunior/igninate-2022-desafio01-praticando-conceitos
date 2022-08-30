import { Trash } from 'phosphor-react';
import styles from './TasksList.module.css';

export interface TaskProps {
  id: string;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: TaskProps[];
  onTaskChange: (id: string) => void;
  onTaskRemove: (id: string) => void;
}

export function TasksList({
  tasks,
  onTaskChange,
  onTaskRemove,
}: TasksListProps) {
  return (
    <div className={styles.tasks}>
      <ul>
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              <input
                type="checkbox"
                onChange={() => onTaskChange(task.id)}
                checked={task.done}
                name={task.id}
              />
              <label className={task.done ? 'task-done' : ''} htmlFor={task.id}>
                {task.title}
              </label>
              <button onClick={() => onTaskRemove(task.id)}>
                <Trash size={20} />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
