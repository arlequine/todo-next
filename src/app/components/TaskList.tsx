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
                  <>
                    <div className="flex flex-col md:flex-row md:items-center">
                      <input 
                        type="text" 
                        value={newTitle} 
                        onChange={(e) => setNewTitle(e.target.value)} 
                        className="border p-1 w-full md:w-1/2 ml-2"
                      />
                      <div className="flex items-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={task.completed} 
                            onChange={() => toggleTaskCompletion(task.id)} 
                            className="sr-only peer"
                          />
                          <div className={`w-11 h-6 rounded-full transition-colors ${task.completed ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <div className="absolute w-5 h-5 bg-white rounded-full shadow-md left-1 top-0.5 transition-transform peer-checked:translate-x-full"></div>
                        </label>
                        <label className="text-sm md:w-1/2">Completar</label>
                      </div>
                    </div>
                  </>
                ) : (
                  <span className={task.completed ? 'line-through' : ''} title={task.completed ? 'Completada' : 'No completada'}>
                    {task.title}
                  </span>
                )}
              </td>
              <td className="border border-gray-300 p-2">
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