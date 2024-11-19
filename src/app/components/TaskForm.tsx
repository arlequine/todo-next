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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-2 mb-4">
      <input
        type="text"
        {...register('title', { required: 'El título es obligatorio' })}
        className={`border p-2 flex-grow ${errors.title ? 'border-red-500' : ''}`}
        placeholder="Agregar nueva tarea"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Agregar
      </button>
      {errors.title && <span className="text-red-500">{errors.title.message}</span>}
    </form>
  );
};

export default TaskForm;