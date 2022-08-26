import { PlusCircle, Trash } from 'phosphor-react';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './App.module.css';
import noTaskIcon from './assets/no-task.svg';
import { Header } from './components/Header';
import './global.css';

interface Task {
  id: string;
  title: string;
  done: boolean;
}

function App() {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
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

    const input = event.currentTarget.elements[0] as HTMLInputElement;
    input.focus();
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

  const totalTask = tasks.length;
  const totalDoneTask = tasks.reduce(
    (previousValue, currentValue) =>
      currentValue.done ? previousValue + 1 : previousValue,
    0
  );

  return (
    <>
      <div className={styles.content}>
        <Header />

        <form onSubmit={handleSubmit} className={styles.formTodo}>
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
              Tarefas Criadas <span>{totalTask}</span>
            </p>

            <p className={styles.tasksDone}>
              Concluídas{' '}
              <span>
                {totalTask === 0 ? 0 : `${totalDoneTask} de ${totalTask}`}
              </span>
            </p>
          </header>
          {totalTask === 0 && (
            <div className={styles.noTasks}>
              <img src={noTaskIcon} alt="Sem tarefas" />
              <p>
                <strong>Você ainda não tem tarefas cadastradas</strong>
              </p>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          )}

          <div className={styles.tasks}>
            <ul>
              {tasks.map((task) => {
                return (
                  <li key={task.id}>
                    <input
                      type="checkbox"
                      onChange={() => handleTaskChange(task.id)}
                      checked={task.done}
                      name={task.id}
                    />
                    <label
                      className={task.done ? 'task-done' : ''}
                      htmlFor={task.id}
                    >
                      {task.title}
                    </label>
                    <button onClick={() => handleTaskRemove(task.id)}>
                      <Trash size={20} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
