'use client';
import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';

const TaskList: React.FC = () => {
  const { tasks, editTask, deleteTask, toggleTaskCompletion } = useTaskContext();
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');

  const handleEdit = (taskId: string, currentTitle: string) => {
    if (editingTaskId === taskId) {
      editTask(taskId, newTitle || currentTitle);
      setEditingTaskId(null);
      setNewTitle('');
    } else {
      setEditingTaskId(taskId);
      setNewTitle(currentTitle);
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Lista de Tareas</h2>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">#</th>
            <th className="border border-gray-300 p-2">Tarea</th>
            <th className="border border-gray-300 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.id} className="border border-gray-300">
              <td className="border border-gray-300 p-2">{index + 1}</td>
              <td className="border border-gray-300 p-2">
                {editingTaskId === task.id ? (
                  <input 
                    type="text" 
                    value={newTitle} 
                    onChange={(e) => setNewTitle(e.target.value)} 
                    className="border p-1 w-full"
                  />
                ) : (
                  <span className={task.completed ? 'line-through' : ''}>
                    {task.title}
                  </span>
                )}
              </td>
              <td className="border border-gray-300 p-2">
                <button 
                  onClick={() => toggleTaskCompletion(task.id)} 
                  className={`p-1 mx-1 ${task.completed ? 'bg-green-500' : 'bg-gray-500'} text-white`}
                >
                  {task.completed ? '✔️' : '❌'}
                </button>
                {editingTaskId === task.id ? (
                  <button 
                    onClick={() => handleEdit(task.id, task.title)} 
                    className="bg-blue-500 text-white p-1 mx-1"
                  >
                    Guardar
                  </button>
                ) : (
                  <button 
                    onClick={() => handleEdit(task.id, task.title)} 
                    className="bg-yellow-500 text-white p-1 mx-1"
                  >
                    Editar
                  </button>
                )}
                <button 
                  onClick={() => deleteTask(task.id)} 
                  className="bg-red-500 text-white p-1 mx-1"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;