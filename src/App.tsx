import { PlusCircle } from 'phosphor-react';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './App.module.css';
import noTaskIcon from './assets/no-task.svg';
import { Header } from './components/Header';
import { TaskProps, TasksList } from './components/TasksList';
import './global.css';

function App() {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  function handleNewTaskSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setTasks((current) => [
      ...current,
      {
        id: uuidv4(),
        title: newTask,
        done: false,
      },
    ]);

    setNewTask('');

    const firstInput = event.currentTarget.elements[0] as HTMLInputElement;
    firstInput.focus();
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setNewTask(event.target.value);
  }

  function handleTaskChange(taskIdToChange: string) {
    const updatedTasks = tasks.map((task) =>
      task.id === taskIdToChange ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
  }

  function handleTaskRemove(taskIdToRemove: string) {
    const taskWithoutDeletedOne = tasks.filter((task) => {
      return task.id !== taskIdToRemove;
    });
    setTasks(taskWithoutDeletedOne);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Ops! Este campo é obrigatório');
  }

  const taskTotals = tasks.reduce(
    (returnValue, currentValue) => {
      currentValue.done && returnValue.doneTotal++;
      returnValue.grandTotal++;
      return returnValue;
    },
    { grandTotal: 0, doneTotal: 0 }
  );

  return (
    <>
      <div className={styles.content}>
        <Header />

        <form onSubmit={handleNewTaskSubmit} className={styles.formTodo}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            name="newTask"
            onChange={handleNewTaskChange}
            value={newTask}
            onInvalid={handleNewTaskInvalid}
            required
            autoFocus
          />
          <button type="submit">
            Criar <PlusCircle size={24} />
          </button>
        </form>
        <section className={styles.tasksContent}>
          <header className={styles.tasksHeader}>
            <p>
              Tarefas Criadas <span>{taskTotals.grandTotal}</span>
            </p>

            <p className={styles.tasksDone}>
              Concluídas{' '}
              <span>
                {taskTotals.grandTotal === 0
                  ? 0
                  : `${taskTotals.doneTotal} de ${taskTotals.grandTotal}`}
              </span>
            </p>
          </header>
          {taskTotals.grandTotal === 0 && (
            <div className={styles.noTasks}>
              <img src={noTaskIcon} alt="Sem tarefas" />
              <p>
                <strong>Você ainda não tem tarefas cadastradas</strong>
              </p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          )}
          <TasksList
            tasks={tasks}
            onTaskChange={handleTaskChange}
            onTaskRemove={handleTaskRemove}
          />
        </section>
      </div>
    </>
  );
}

export default App;
