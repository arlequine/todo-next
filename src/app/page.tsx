import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

export default function Home() {
  return (
    <div className="p-4 md:p-8 w-full">
      <h1 className="text-2xl font-bold text-center mb-4">Gestor de Tareas</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
}