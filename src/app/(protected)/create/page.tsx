'use client';

import { useForm } from 'react-hook-form';
import React from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Create = () => {
  type FormInput = {
    repoUrl: string;
    project: string;
    githubToken?: string;
  };

  const { register, handleSubmit, reset } = useForm<FormInput>();

  function onSubmit(data: FormInput) {
    window.alert(JSON.stringify(data, null, 2));
    reset();
  }

  return (
    <div className="flex items-center gap-12 h-full justify-center">
      <Image
        src="/file.svg"
        alt="File Illustration"
        height={224}
        width={100}
      />
      <div>
        <div>
          <h1 className="font-semibolf text-2xl">Link your Github Repository</h1>
          <p className="text-sm text-muted-foreground">
            Enter the URL of your repository to link it to GH-COPI.
          </p>
        </div>
        <div className="h-4"></div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input {...register('project', { required: true })} placeholder="Project Name" required />
            <div className="h-4"></div>
            <Input {...register('repoUrl', { required: true })} placeholder="Github URL" required />
            <div className="h-4"></div>
            <Input {...register('githubToken')} placeholder="Github Token (Optional)" />
            <div className="h-4"></div>
            <Button type="submit">Start your Project</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
