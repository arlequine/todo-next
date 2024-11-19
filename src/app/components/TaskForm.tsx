'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTaskContext } from '../context/TaskContext';
import { FormData } from '../utils/types';

const TaskForm: React.FC = () => {
  const { addTask } = useTaskContext();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    if (data.title.trim()) {
      addTask(data.title);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center mb-4">
      <input
        type="text"
        {...register('title', { required: 'El título es obligatorio' })}
        className={`border-none border-b-2 border-b-gray-400 bg-transparent focus:outline-none focus:border-b-2 p-2 flex-grow ${errors.title ? 'border-red-500' : ''} text-white`}
        placeholder="Agregar nueva tarea"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit(onSubmit)();
          }
        }}
      />
    </form>
  );
};

export default TaskForm;