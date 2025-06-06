import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTask } from '@/contexts/TaskContext';
import { AddCircleIcon } from 'hugeicons-react';

export function AddTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { addTask } = useTask();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTask(title.trim(), description.trim() || undefined);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Add New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Enter task title..."
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                required
                className="h-12 text-base"
              />
            </div>
            <div>
              <Input
                type="text"
                placeholder="Add description (optional)..."
                value={description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                className="h-12 text-base"
              />
            </div>
          </div>
          <Button
            type="submit"
            variant="tertiary"
            size="lg"
            className="w-full"
          >
            <AddCircleIcon className="h-5 w-5" />
            Add Task
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 