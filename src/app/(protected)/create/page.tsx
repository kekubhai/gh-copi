/* eslint-disable @next/next/no-img-element */
'use client';

import { useForm } from 'react-hook-form';
import React from 'react';
import Image from 'next/image'; // Correctly import the next/image component

const Create = () => {
  type FormInput = {
    repoUrl: string;
    project: string;
    githubToken?: string;
  };

  const { register, handleSubmit, reset } = useForm<FormInput>(); // Correctly use the `useForm` hook

  const onSubmit = (data: FormInput) => {
    console.log(data);
    reset();
  };

  return (
    <div className="flex items-center gap-12 h-full justify-center">
    
      <Image
        src="/file.svg" 
        alt="File Illustration"
        height={224} 
        width="100" 
      />
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <label>
            Repo URL:
            <input
              type="text"
              {...register('repoUrl', { required: true })}
              className="border p-2 rounded"
            />
          </label>
          <label>
            Project:
            <input
              type="text"
              {...register('project', { required: true })}
              className="border p-2 rounded"
            />
          </label>
          <label>
            GitHub Token (optional):
            <input
              type="text"
              {...register('githubToken')}
              className="border p-2 rounded"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
