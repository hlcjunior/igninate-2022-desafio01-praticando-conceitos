import { Trash } from 'phosphor-react';
import styles from './App.module.css';
import noTaskIcon from './assets/no-task.svg';
import plusIcon from './assets/plus.svg';
import { Header } from './components/Header';
import './global.css';

function App() {
  return (
    <>
      <div className={styles.content}>
        <Header />

        <form className={styles.formTodo}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            name="newTask"
          />
          <button type="submit">
            Criar <img src={plusIcon} alt="Criar" />
          </button>
        </form>
        <section className={styles.tasksContent}>
          <header className={styles.tasksHeader}>
            <p>
              Tarefas Criadas <span>0</span>
            </p>

            <p className={styles.tasksDone}>
              Concluídas <span>0</span>
            </p>
          </header>
          <div className={styles.noTasks}>
            <img src={noTaskIcon} alt="Sem tarefas" />
            <p>
              <strong>Você ainda não tem tarefas cadastradas</strong>
            </p>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>

          <div className={styles.tasks}>
            <ul>
              <li>
                <input type="checkbox" name="task1" />
                <label htmlFor="task1">Tarefa 1</label>
                <button>
                  <Trash size={20} />
                </button>
              </li>
              <li>
                <input type="checkbox" name="task2" />
                <label htmlFor="task2">Tarefa 2</label>
                <button>
                  <Trash size={20} />
                </button>
              </li>
              <li>
                <input type="checkbox" name="task3" />
                <label htmlFor="task3">Tarefa 3</label>
                <button>
                  <Trash size={20} />
                </button>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
