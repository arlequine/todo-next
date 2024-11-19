'use client';
import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';

const TaskList: React.FC = () => {
  const { tasks, editTask, deleteTask, toggleTaskCompletion } = useTaskContext();
  const [newTitle, setNewTitle] = useState<{ [key: string]: string }>({});

  const handleChange = (taskId: string, value: string) => {
    setNewTitle((prev) => ({ ...prev, [taskId]: value }));
  };

  return (
    <div className="mt-4">
      <ul className="list-none">
        {tasks.map((task) => (
          <li key={task.id} className="flex bg-transparent items-center justify-start border-b-2 border-b-gray-400  py-2 w-full">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
              className="form-checkbox h-5 w-5 accent-green-600 border-2 border-gray-300 rounded-md"
            />
            <input
              type="text"
              value={newTitle[task.id] || task.title}
              onChange={(e) => handleChange(task.id, e.target.value)}
              onBlur={() => editTask(task.id, newTitle[task.id] || task.title)}
              className="bg-transparent border-none text-white border-none bg-transparent focus:outline-none focus:border-b-2 w-auto"
              placeholder="Agregar nueva tarea"
            />
            <button onClick={() => deleteTask(task.id)} className="bg-red-500 text-white p-1 mx-1">
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;