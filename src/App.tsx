import styles from './App.module.css';
import noTaskIcon from './assets/no-task.svg';
import plusIcon from './assets/plus.svg';
import { Header } from './components/Header';
import './global.css';

function App() {
  return (
    <>
      <Header />

      <form className={styles.newTodoContent}>
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
      </section>
    </>
  );
}

export default App;
